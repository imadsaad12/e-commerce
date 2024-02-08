const Category = require("../models/categoryModel");

const addCategory = (data) => Category.create(data);
const allCategories = () => Category.find();
const getSingleCategory = async (id) => Category.findById(id);
const deleteCategoryById = async (id) => Category.findOneAndDelete(id);
const updateCategoryById = async (id, data) =>
  Category.findOneAndUpdate(id, data);

module.exports = {
  addCategory,
  allCategories,
  getSingleCategory,
  deleteCategoryById,
  updateCategoryById,
};
