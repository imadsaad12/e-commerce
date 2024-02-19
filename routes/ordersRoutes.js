const express = require("express");
const {
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  getStatistics,
} = require("../controllers/ordersControllers");
const { validateToken } = require("../middleware/authenticate");
const { tryCatch } = require("../utilities/errors");
const { addOrderSchema } = require("../validations/orderValidation");
const { validate } = require("express-validation");
const router = new express.Router();

router.get("/statistics", tryCatch(validateToken), getStatistics);

router.post("/", tryCatch(validate(addOrderSchema)), addOrder);

router.get("/", tryCatch(validateToken), getAllOrders);

router.get("/:id", tryCatch(validateToken), getOrderById);

router.delete("/:id", tryCatch(validateToken), deleteOrder);

//   router.put("/:id", updateOrder);

module.exports = router;
