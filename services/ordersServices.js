const Orders = require("../models/orderModel");
const Order = require("../models/orderModel");
const Products = require("../models/productModel");

const createOrder = async (data) => Order.create(data);

const allOrders = async (limit) => {
  if (limit !== -1) {
    return Order.find().sort({ createdAt: 1 }).limit(limit);
  } else {
    return Order.find().sort({ createdAt: 1 });
  }
};

const getProfitsAndNumberOfProductsAndOrders = async () => {
  const numberOfProducts = await Products.countDocuments();
  const numberOfOrders = await Orders.countDocuments();
  const [profits] = await Orders.aggregate([
    {
      $group: {
        _id: null,
        totalProfits: { $sum: "$totalPrice" },
      },
    },
  ]);

  return { profits: profits.totalProfits, numberOfOrders, numberOfProducts };
};

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
  getProfitsAndNumberOfProductsAndOrders,
};
