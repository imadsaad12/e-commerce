const express = require("express");
const multer = require("multer");
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
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

router.post("/", tryCatch(validateToken), multerUpload.any(), addProduct);

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.delete("/:id", tryCatch(validateToken), deleteProduct);

router.put("/:id", tryCatch(validateToken), updateProduct);

module.exports = router;
