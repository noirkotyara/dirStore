var express = require("express");

var authMiddleware = require("../../middlewares/auth.middleware");
var checkAccessMiddleware = require("../../middlewares/check-access.middleware");

var checkoutController = require("../../controllers/checkout/checkout.controller");

var checkoutRouter = express.Router();

checkoutRouter.post(
  "/item",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function (req, res, next) {
    checkoutController.makeCheckoutByRandom(req.user.userId, next);
  }
);

module.exports = checkoutRouter;
