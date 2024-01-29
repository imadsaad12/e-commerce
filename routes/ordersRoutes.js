const {
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
} = require("../controllers/ordersControllers");

const ordersRoutes = (router) => {
  router.post("/", addOrder);

  router.get("/", getAllOrders);

  router.get("/:id", getOrderById);

  router.delete("/:id", deleteOrder);

  //   router.put("/:id", updateOrder);

  return router;
};

module.exports = ordersRoutes;
