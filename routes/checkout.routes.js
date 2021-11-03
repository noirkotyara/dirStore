var express = require("express");

var authMiddleware = require("./../middlewares/auth.middleware");

var checkoutController = require("./../controllers/checkout/checkout.controller");

var checkoutRouter = express.Router();

/**
 * ONLY for USER:
 * post -> /item
 * **/

checkoutRouter.post(
  "/item",
  authMiddleware.verifyToken,
  function (req, res, next) {
    checkoutController.makeCheckoutByRandom(req.user.userId, next);
  }
);

module.exports = checkoutRouter;
