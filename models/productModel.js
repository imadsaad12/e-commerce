const mongoose = require("mongoose");

const availableItem = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const image = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    sizes: [availableItem],
    images: [image],
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productsSchema);

module.exports = Products;
