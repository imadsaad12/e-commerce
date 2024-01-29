const Order = require("../models/orderModel");

const createOrder = async (data) => Order.create(data);

const allOrders = async () => Order.find();

const getSingleOrder = async (id) => Order.findById(id);

const deleteOrderById = async (id) => Order.findOneAndDelete(id);

const updateOrderById = async (id, data) =>
  Order.findOneAndUpdate(
    { _id: id },
    {
      $set: data,
    }
  );

module.exports = {
  createOrder,
  allOrders,
  getSingleOrder,
  deleteOrderById,
  updateOrderById,
};
