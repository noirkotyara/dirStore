var express = require("express");

var authMiddleware = require("../../middlewares/auth.middleware");
var checkoutMiddleware = require("../../middlewares/checkout.middleware");
var checkAccessMiddleware = require("../../middlewares/check-access.middleware");

var checkoutController = require("../../controllers/checkout");

var checkoutRouter = express.Router();

checkoutRouter.post(
  "/item",
  [
    authMiddleware.verifyToken,
    checkAccessMiddleware,
    checkoutMiddleware.createCheckoutValidation,
  ],
  function (req, res, next) {
    checkoutController.createCheckout(req.user.userId, req.body, next);
  }
);

module.exports = checkoutRouter;
