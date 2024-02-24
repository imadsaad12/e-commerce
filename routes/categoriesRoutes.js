const express = require("express");
const multer = require("multer");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoriesControllers");
const { tryCatch } = require("../utilities/errors");
const { validateToken } = require("../middleware/authenticate");
const router = new express.Router();
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

router.post("/", tryCatch(validateToken), multerUpload.any(), createCategory);

router.get("/", getAllCategories);

router.delete("/:id", tryCatch(validateToken), deleteCategory);

router.put("/:id", tryCatch(validateToken), multerUpload.any(), updateCategory);

module.exports = router;
