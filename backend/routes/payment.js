const express = require('express');
const { isLoggedIn } = require("../middlewares/user");
const { sendStripeKey, captureStripePayment } = require('../controllers/paymentController');
const router = express.Router();

router.route("/stripekey").get(isLoggedIn, sendStripeKey);

router.route("/captureStripe").post(isLoggedIn, captureStripePayment);

module.exports = router;