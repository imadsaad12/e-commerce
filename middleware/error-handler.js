const { makeError } = require("../utilities/errors");
const logger = require("../utilities/logger");
const { INTERNAL_SERVER } = require("../utilities/server-statuses");
const { INTERNAL_ERROR_MESSAGE } = require("../utilities/server-messages");

// This is a centralized error handler that handle any error in any middleware
// So anu change in the behavior of handling error should be done here

const errorHandler = (error, req, res, next) => {
  if (error) {
    logger.error(error.message);
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.status || INTERNAL_SERVER;

    res.status(status);
    return res.send(makeError(message, status));
  }
  next();
};

module.exports = errorHandler;
