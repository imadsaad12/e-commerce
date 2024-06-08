const Products = require("../models/productModel");
const { deleteImageFromGCP } = require("../utilities/GCP-images");

const createProduct = async (data) => Products.create(data);

const allProducts = async (category, type, getProductsWithHightPriority) => {
  let products;
  if (getProductsWithHightPriority) {
    products = await Products.find({ isHighPriority: true });
  } else if (category === "*" && type) {
    products = await Products.find({ type });
  } else if (category && type) {
    products = await Products.find({ category, type });
  } else {
    products = await Products.find();
  }
  return products;
};

const getSingleProduct = async (id) => Products.findById(id);

const deleteProductById = async (_id) => {
  const { images } = await Products.findOne({ _id });

  images.map(async ({ url }) => {
    await deleteImageFromGCP(url);
  });

  return Products.findOneAndDelete({_id});
};

const updateProductById = async (id, data) =>
  Products.findOneAndUpdate(
    { _id: id },
    {
      $set: data,
    }
  );

const updateManyProducts = (oldCategory, newCategory, type) =>
  Products.updateMany(
    { category: oldCategory, type },
    { $set: { category: newCategory } }
  );

const deleteManyProducts = async ({ category, type }) => {
  const products = await allProducts(category, type);

  products.map(({ images }) => {
    images.map(async ({ url }) => {
      await deleteImageFromGCP(url);
    });
  });

  await Products.deleteMany({ category, type });
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
