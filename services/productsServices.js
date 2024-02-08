const Products = require("../models/productModel");
const { deleteImageFromGCP } = require("../utilities/GCP-images");

const createProduct = async (data) => Products.create(data);

const allProducts = async (category) => {
  let products;
  if (category) {
    products = await Products.find({ category });
  } else {
    products = await Products.find();
  }
  return products;
};

const getSingleProduct = async (id) => Products.findById(id);

const deleteProductById = async (id) => Products.findOneAndDelete(id);

const updateProductById = async (id, data) =>
  Products.findOneAndUpdate(
    { _id: id },
    {
      $set: data,
    }
  );

const updateManyProducts = (oldCategory, newCategory) =>
  Products.updateMany(
    { category: oldCategory },
    { $set: { category: newCategory } }
  );

const deleteManyProducts = async (categoryToDelete) => {
  const products = await allProducts(categoryToDelete);

  products.map(({ images }) => {
    images.map(async ({ url }) => {
      await deleteImageFromGCP(url);
    });
  });

  await Products.deleteMany({ category: categoryToDelete });
};

module.exports = {
  createProduct,
  allProducts,
  getSingleProduct,
  deleteProductById,
  updateProductById,
  updateManyProducts,
  deleteManyProducts,
};
