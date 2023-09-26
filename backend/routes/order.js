const express = require("express");
const { isLoggedIn, customRole } = require("../middlewares/user");
const {
  createOrder,
  getOneOrder,
  getLoggedInOrders,
  adminGetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/order/:id").get(isLoggedIn, getOneOrder);
router.route("/myOrders").get(isLoggedIn, getLoggedInOrders);

router
  .route("/admin/allOrders")
  .get(isLoggedIn, customRole("admin"), adminGetAllOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOrder)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOrder);

module.exports = router;
