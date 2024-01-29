const express = require("express");
const router = new express.Router();
const {
  addProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productsControllers");
const { validateToken } = require("../middleware/authenticate");
const { tryCatch } = require("../utilities/errors");

router.post("/", tryCatch(validateToken), addProduct);

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.delete("/:id", tryCatch(validateToken), deleteProduct);

router.put("/:id", tryCatch(validateToken), updateProduct);

module.exports = router;
