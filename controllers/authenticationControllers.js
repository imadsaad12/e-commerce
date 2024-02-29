const jwt = require("jsonwebtoken");
const logger = require("../utilities/logger");
const { makeError } = require("../utilities/errors");
const { isEmpty, isEqual, isUndefined } = require("lodash");
const {
  INTERNAL_ERROR_MESSAGE,
  INVALID_CREDENTIALS_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  TOKEN_EXPIRED_OR_MISSED_MESSAGE,
} = require("../utilities/server-messages");
const {
  INTERNAL_SERVER,
  SUCCESS,
  UNAUTHORIZED,
  TOKEN_EXPIRED_OR_MISSED,
} = require("../utilities/server-statuses");

const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(process.env.SECRET_KEY);

    if (userName !== "super-admin" || password !== "Password@123") {
      throw makeError(INVALID_CREDENTIALS_MESSAGE, UNAUTHORIZED);
    }
    const currentDate = new Date();

    const expirationDate = new Date(currentDate);
    expirationDate.setFullYear(currentDate.getFullYear() + 1);

    const expTimestamp = Math.floor(expirationDate.getTime() / 1000);

    const accessToken = jwt.sign(
      { userName, role_id: 1 },
      process.env.SECRET_KEY,
      {
        expiresIn: expTimestamp,
      }
    );

    // const refreshToken = jwt.sign(
    //   { userName, role_id: 1 },
    //   process.env.REFRESH_TOKEN_SECRET_KEY,
    //   {
    //     expiresIn: "365d",
    //   }
    // );

    logger.info(`Logged in successfully`);

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "strict",
    // });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      domain: ".onrender.com",
    });

    res.status(SUCCESS);
    res.end();
  } catch (error) {
    logger.error(error);
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.status || INTERNAL_SERVER;

    res.status(status);
    res.send(makeError(message, status));
  }
};

const validateToken = async (req, res) => {
  try {
    if (!req?.headers?.Authorization)
      throw makeError(INVALID_CREDENTIALS_MESSAGE, UNAUTHORIZED);

    const { Authorization } = req.headers;
    const accessToken = Authorization.split(" ")[1];

    jwt.verify(accessToken, process.env.SECRET_KEY);

    logger.info("Valid Token");

    res.status(200);
    res.send("Valid Token");
    res.end();
  } catch (error) {
    logger.error(error.message);

    const message = UNAUTHORIZED_MESSAGE;
    const status = UNAUTHORIZED;

    res.status(status);
    res.send(makeError(message, status));
  }
};

const generateAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req?.cookies;
    if (isUndefined(refreshToken)) {
      throw makeError(TOKEN_EXPIRED_OR_MISSED_MESSAGE, TOKEN_EXPIRED_OR_MISSED);
    }

    logger.info("Validating refresh token");

    const { userName, role_id } = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    const accessToken = jwt.sign(
      { userName, role_id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    logger.info("Access token generated");

    res.status(SUCCESS);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .end();
  } catch (error) {
    logger.error(error.message);

    const message = error.message || UNAUTHORIZED_MESSAGE;
    const status = error.status || UNAUTHORIZED;

    res.status(status);
    res.send(makeError(message, status));
  }
};

const logOut = async (req, res) => {
  try {
    logger.info("Clearing cookie . . .");

    res.clearCookie("accessToken", { sameSite: "strict", httpOnly: true });
    res.clearCookie("refreshToken", { sameSite: "strict", httpOnly: true });
    res.status(SUCCESS).end();
  } catch (error) {
    logger.error(error.message);

    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.status || INTERNAL_SERVER;
    res.status(status);
    res.send(makeError(message, status));
  }
};

module.exports = {
  signIn,
  validateToken,
  generateAccessToken,
  logOut,
};
