const mongoose = require("mongoose");
const uuid = require("uuid");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
});

const ordersSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => uuid.v4(),
      unique: true,
    },
    clientFullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: addressSchema,
    products: [productSchema],
  },
  { timestamps: true }
);

const Orders = mongoose.model("orders", ordersSchema);

module.exports = Orders;
