var express = require("express");

var authMiddleware = require("../../middlewares/auth.middleware");
var checkoutMiddleware = require("../../middlewares/checkout.middleware");
var checkAccessMiddleware = require("../../middlewares/check-access.middleware").checkAccessMiddleware;

var checkoutController = require("../../controllers/checkout");

var checkoutRouter = express.Router();

checkoutRouter.post(
  "/item",
  [
    authMiddleware.verifyToken,
    checkAccessMiddleware,
    checkoutMiddleware.createCheckoutValidation
  ],
  function(req, res, next) {
    checkoutController.createCheckout(req.user.userId, req.body, next);
  }
);

checkoutRouter.get(
  "/item/:id",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function(req, res, next) {
    checkoutController.getCheckoutInfo(req.params.id, next);
  }
);

checkoutRouter.get(
  "/list",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function(req, res, next) {
    checkoutController.getUserCheckouts(req.user.userId, next);
  }
);

module.exports = checkoutRouter;
