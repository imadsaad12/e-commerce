const logger = require("../utilities/logger");
const { makeError } = require("../utilities/errors");
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
const {
  createOrder,
  allOrders,
  getSingleOrder,
  deleteOrderById,
  updateOrderById,
  getProfitsAndNumberOfProductsAndOrders,
} = require("../services/ordersServices");
const { sendEmail } = require("../utilities/email");

const addOrder = async (req, res) => {
  try {
    const data = req.body;
    const { email, products } = data;

    await createOrder(data);
    await sendEmail({ email, products });

    logger.info("Order added successfully");

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

const getAllOrders = async (req, res) => {
  try {
    const { limit = -1 } = req.query;
    const orders = await allOrders(limit);

    if (!orders) {
      logger.error("No orders found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    res.status(SUCCESS);
    res.json(orders);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.statusCode || INTERNAL_SERVER;

    logger.error(message);

    res.status(status);
    res.send(makeError(message, status));
  }
};

const getStatistics = async (req, res) => {
  try {
    const data = await getProfitsAndNumberOfProductsAndOrders();

    res.status(SUCCESS);
    res.json(data);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.statusCode || INTERNAL_SERVER;

    logger.error(message);

    res.status(status);
    res.send(makeError(message, status));
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await getSingleOrder(id);

    if (!order) {
      logger.error("No order found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    res.status(SUCCESS);
    res.json(order);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.statusCode || INTERNAL_SERVER;

    logger.error(message);
    res.status(status);
    res.send(makeError(message, status));
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await getSingleOrder(id);

    if (!order) {
      logger.error("No order found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    await deleteOrderById(id);

    logger.info("Order deleted successfully");

    res.status(SUCCESS_NO_CONTENT);
    res.send(SUCCESS_MESSAGE);
  } catch (error) {
    const message = error.message || INTERNAL_ERROR_MESSAGE;
    const status = error.status || INTERNAL_SERVER;

    logger.error(message);

    res.send(makeError(message, status));
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const order = await getSingleOrder(id);

    if (!order) {
      logger.error("No order found");
      throw makeError(NOT_FOUND_MESSAGE, NOT_FOUND);
    }

    await updateOrderById(id, data);
    logger.info("Order updated successfully");

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
  addOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrderById,
  getStatistics,
};
