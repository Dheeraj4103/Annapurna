const express = require('express');
const { testProduct, getAllProducts, addProduct, adminGetAllProducts, getOneProduct, adminUpdateOneProduct, adminDeleteOneProduct, addReview, deleteReview, getOnlyReviewsForOneProduct } = require('../controllers/productController');
const { isLoggedIn, customRole } = require("../middlewares/user");
const router = express.Router();

// user routes
router.route("/testProduct").get(testProduct);
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getOneProduct);
router.route("/review").put(isLoggedIn, addReview);
router.route("/review").delete(isLoggedIn, deleteReview);
router.route("/reviews").get(getOnlyReviewsForOneProduct);

// admin routes
router.route("/admin/product/add").post(isLoggedIn, customRole("admin"), addProduct);
router.route("/admin/products").get(isLoggedIn, customRole("admin"), adminGetAllProducts);
router.route("/admin/product/:id").put(isLoggedIn, customRole("admin"), adminUpdateOneProduct).delete(isLoggedIn, customRole("admin"), adminDeleteOneProduct);

module.exports = router;