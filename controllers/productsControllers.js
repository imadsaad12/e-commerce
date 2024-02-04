const {
  createProduct,
  allProducts,
  getSingleProduct,
  deleteProductById,
  updateProductById,
} = require("../services/productsServices");
const logger = require("../utilities/logger");
const { makeError } = require("../utilities/errors");
const {
  SUCCESS,
  INTERNAL_SERVER,
  NOT_FOUND,
  SUCCESS_NO_CONTENT,
} = require("../utilities/server-Statuses");
const {
  SUCCESS_MESSAGE,
  INTERNAL_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require("../utilities/server-messages");

const addProduct = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.files);
    console.log(req.body.images[0].url);
    // await createProduct(data);

    logger.info("Product added successfully");

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

const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await allProducts(category);

    if (!products) {
      logger.error("No products found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    res.status(SUCCESS);
    res.json(products);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.statusCode || INTERNAL_SERVER;

    logger.error(message);

    res.status(status);
    res.send(makeError(message, status));
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getSingleProduct(id);

    if (!product) {
      logger.error("No products found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    res.status(SUCCESS);
    res.json(product);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.statusCode || INTERNAL_SERVER;

    logger.error(message);
    res.status(status);
    res.send(makeError(message, status));
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getSingleProduct(id);

    if (!product) {
      logger.error("No products found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    await deleteProductById(id);

    logger.info("Product deleted successfully");

    res.status(SUCCESS_NO_CONTENT);
    res.send(SUCCESS_MESSAGE);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.status || INTERNAL_SERVER;

    logger.error(message);

    res.send(makeError(message, status));
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    data = req.body;

    const product = await getSingleProduct(id);

    if (!product) {
      logger.error("No products found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    await updateProductById(id, data);
    logger.info("Product added successfully");

    res.status = SUCCESS_NO_CONTENT;
    res.send(SUCCESS_MESSAGE);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.status || INTERNAL_SERVER;

    logger.error(message);

    res.send(makeError(message, status));
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
