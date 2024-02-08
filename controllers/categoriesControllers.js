const {
  addCategory,
  allCategories,
  getSingleCategory,
  deleteCategoryById,
  updateCategoryById,
} = require("../services/categoriesServices");
const {
  updateManyProducts,
  deleteManyProducts,
} = require("../services/productsServices");
const { makeError } = require("../utilities/errors");
const logger = require("../utilities/logger");
const {
  SUCCESS_NO_CONTENT,
  INTERNAL_SERVER,
  NOT_FOUND,
  SUCCESS,
} = require("../utilities/server-Statuses");
const {
  SUCCESS_MESSAGE,
  INTERNAL_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require("../utilities/server-messages");

const createCategory = async (req, res) => {
  try {
    const data = req.body;

    await addCategory(data);

    logger.info("Category added successfully");

    res.status(SUCCESS_NO_CONTENT);
    res.send(SUCCESS_MESSAGE);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.statusCode || INTERNAL_SERVER;

    logger.error(message);
    res.status(status);
    res.send(makeError(message, status));
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await allCategories();

    if (!categories) {
      logger.error("No categories found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    res.status(SUCCESS);
    res.json(categories);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.statusCode || INTERNAL_SERVER;

    logger.error(message);

    res.status(status);
    res.send(makeError(message, status));
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await getSingleCategory(id);

    if (!category) {
      logger.error("Category not found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    await deleteManyProducts(category.category);
    await deleteCategoryById(id);

    logger.info("Category deleted successfully");

    res.status(SUCCESS_NO_CONTENT);
    res.send(SUCCESS_MESSAGE);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.status || INTERNAL_SERVER;

    logger.error(message);

    res.send(makeError(message, status));
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category: newCategory } = req.body;
    const category = await getSingleCategory(id);

    if (!category) {
      logger.error("Category not found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    await updateCategoryById(id, data);

    await updateManyProducts(category.category, newCategory);

    logger.info("Category updated successfully");

    res.status(SUCCESS_NO_CONTENT);
    res.send(SUCCESS_MESSAGE);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.status || INTERNAL_SERVER;

    logger.error(message);

    res.send(makeError(message, status));
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
};