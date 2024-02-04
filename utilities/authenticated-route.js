const express = require("express");
const { tryCatch } = require("./errors");
const { validateToken } = require("../middleware/authenticate");

// This Function is used to authenticate every request.
// So it will be validated once it pass the validateToken middleware

const AuthenticatedRouter = () => {
  const router = new express.Router({ mergeParams: true });
  router.all("/*", tryCatch(validateToken), (req, res, next) => {
    res.status(200);
    next();
  });

  return router;
};

module.exports = { AuthenticatedRouter };
