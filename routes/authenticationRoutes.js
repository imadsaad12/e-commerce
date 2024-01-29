const express = require("express");
const {
  signIn,
  validateToken,
  generateAccessToken,
  logOut,
} = require("../controllers/authenticationControllers");
const router = express.Router();

router.post("/signin", signIn);
router.get("/refresh", generateAccessToken);
router.get("/validate-token", validateToken);
router.post("/logout", logOut);

module.exports = router;
