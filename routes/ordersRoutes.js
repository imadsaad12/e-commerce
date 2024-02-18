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
const router = new express.Router();

router.get("/statistics", tryCatch(validateToken), getStatistics);

router.post("/", addOrder);

router.get("/", tryCatch(validateToken), getAllOrders);

router.get("/:id", tryCatch(validateToken), getOrderById);

router.delete("/:id", tryCatch(validateToken), deleteOrder);

//   router.put("/:id", updateOrder);

module.exports = router;
