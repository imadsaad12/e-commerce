const makeError = (message, status) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

const tryCatch = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

module.exports = {
  makeError,
  tryCatch,
};
