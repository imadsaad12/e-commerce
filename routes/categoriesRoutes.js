const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoriesControllers");

const categoriesRoutes = (router) => {
  router.post("/", createCategory);

  router.get("/", getAllCategories);

  router.delete("/:id", deleteCategory);

  router.put("/:id", updateCategory);

  return router;
};

module.exports = categoriesRoutes;
