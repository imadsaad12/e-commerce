const jwt = require("jsonwebtoken");
const { makeError } = require("../utilities/errors");
const { UNAUTHORIZED_MESSAGE } = require("../utilities/server-messages");
const { UNAUTHORIZED } = require("../utilities/server-messages");

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(makeError(UNAUTHORIZED_MESSAGE, UNAUTHORIZED));
  }
  const token = authorization?.split(" ")[1];

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

  req.user = decodedToken;
  next();
};

const setAuthorizationHeader = (req, res, next) => {
  if (req.cookies.accessToken) {
    req.headers["Authorization"] = `Bearer ${req.cookies.accessToken}`;
  }
  next();
};

module.exports = {
  validateToken,
  setAuthorizationHeader,
};
