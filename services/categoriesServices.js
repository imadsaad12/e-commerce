const Category = require("../models/categoryModel");

const addCategory = (data) => Category.create(data);
const allCategories = () => Category.find();
const getSingleCategory = async (id) => Category.findById(id);
const deleteCategoryById = async (id) => Category.findOneAndDelete({ _id: id });
const updateCategoryById = async (_id, data) =>
  Category.findOneAndUpdate({ _id }, data);

module.exports = {
  addCategory,
  allCategories,
  getSingleCategory,
  deleteCategoryById,
  updateCategoryById,
};
