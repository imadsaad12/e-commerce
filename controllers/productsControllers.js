const {
  createProduct,
  allProducts,
  getSingleProduct,
  deleteProductById,
  updateProductById,
} = require("../services/productsServices");
const logger = require("../utilities/logger");
const { makeError } = require("../utilities/errors");
const { isEmpty } = require("lodash");
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
const { Storage } = require("@google-cloud/storage");
const {
  uploadImageToGCP,
  deleteImageFromGCP,
} = require("../utilities/GCP-images");

const addProduct = async (req, res) => {
  try {
    const { images, sizes, isHighPriority, ...rest } = req.body;
    const files = req.files;
    const uploadedFiles = await uploadImageToGCP(files);

    const imagesWithURLs = images.map((image, index) => ({
      ...image,
      url: uploadedFiles[index],
    }));

    const filteredSizes = sizes.filter((size) => size !== null);

    await createProduct({
      images: imagesWithURLs,
      sizes: filteredSizes,
      isHighPriority: isHighPriority === "true",
      ...rest,
    });

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
    const { category = null, type = null } = req.query;
    let products = await allProducts(category, type);

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
    const data = req.body;
    const { images } = data;

    const product = await getSingleProduct(id);

    if (!product) {
      logger.error("No products found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    const newImages = images.map(({ id, ...rest }) => {
      const file = req.files.find((elm) => id === elm.originalname);

      if (!isEmpty(file)) {
        return { id, file, ...rest };
      }
      return { id, file: undefined, ...rest };
    });

    const startsWithBlob = /^blob/i;
    const stringStartsWithBlob = (testString) =>
      startsWithBlob.test(testString);

    const uploadImage = async ({ url, file = {}, ...rest }) => {
      if (rest.isDeleted === "true") {
        if (!stringStartsWithBlob(url)) {
          await deleteImageFromGCP(url);
          return { ...rest };
        }
      } else {
        if (typeof file === "object" && !isEmpty(file)) {
          const [uploadedUrl] = await uploadImageToGCP([file]);
          return { isDeleted: "false", url: uploadedUrl, ...rest };
        } else {
          return { isDeleted: "false", url, ...rest };
        }
      }
    };
    const uploadPromises = newImages.map(uploadImage);

    const updatedImages = await Promise.all(uploadPromises);

    data.images = updatedImages.filter((elm) => elm?.isDeleted === "false");
    data.sizes = data?.sizes?.filter((elm) => elm !== null);

    await updateProductById(id, data);

    logger.info("Product updated successfully");

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
  addProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
