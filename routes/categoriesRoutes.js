const express = require("express");
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoriesControllers");
const { tryCatch } = require("../utilities/errors");
const { validateToken } = require("../middleware/authenticate");
const router = new express.Router();

router.post("/", tryCatch(validateToken), createCategory);

router.get("/", getAllCategories);

router.delete("/:id", tryCatch(validateToken), deleteCategory);

router.put("/:id", tryCatch(validateToken), updateCategory);

module.exports = router;
