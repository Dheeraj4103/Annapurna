const BigPromise = require("../middlewares/bigPromise");
const Order = require("../models/Order");
const Product = require("../models/Product");
const CustomError = require("../utils/customError");

exports.createOrder = BigPromise(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
    user
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: user || req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getOneOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new CustomError("Please Enter a valid Order Id", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getLoggedInOrders = BigPromise(async (req, res, next) => {
  const userId = req.query.userId
  const orders = await Order.find({ user: userId });

  if (!orders) {
    return next(new CustomError("Check if User Logged In or Not", 401));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.adminGetAllOrders = BigPromise(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.adminUpdateOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new CustomError("Order is Already Delivered", 401));
  }

  order.orderStatus = req.body.orderStatus;

  order.orderItems.forEach(async (prod) => {
    await updateProductStock(prod.product, prod.quantity);
  });

  if (req.body.orderStatus === "Delivered") {
    order.deliverddAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.adminDeleteOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new CustomError("Order doesn't exist", 401));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

async function updateProductStock(productId, quantity) {
  const product = await Product.findById(productId);

  if (!product) {
    return new CustomError("Product doesn't Exist");
  }

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}
