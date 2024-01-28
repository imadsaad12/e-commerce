const logger = require("../utilities/logger");

const logApiHit = (req, res, next) => {
  logger.info(`API hit: ${req.method} ${req.url}`);
  next();
};

module.exports = logApiHit;
