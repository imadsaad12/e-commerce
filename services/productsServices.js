const Products = require("../models/productModel");

const createProduct = async (data) => Products.create(data);

const allProducts = async (category) => Products.find({ category });

const getSingleProduct = async (id) => Products.findById(id);

const deleteProductById = async (id) => Products.findOneAndDelete(id);

const updateProductById = async (id, data) =>
  Products.findOneAndUpdate(
    { _id: id },
    {
      $set: data,
    }
  );

module.exports = {
  createProduct,
  allProducts,
  getSingleProduct,
  deleteProductById,
  updateProductById,
};
