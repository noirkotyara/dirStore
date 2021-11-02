var express = require("express");
var router = express.Router();

var requesterTypeMiddleware = require("./../middlewares/requesterType.middleware");
var authMiddleware = require("./../middlewares/auth.middleware");

var authController = require("./../controllers/auth/auth.controller");
var userController = require("./../controllers/user/user.controller");
var checkoutController = require("./../controllers/checkout/checkout.controller");
var identifierController = require("./../controllers/identifier/identifier.controller");

router.post("/register", requesterTypeMiddleware, function (req, res, next) {
  authController.register(req.body, next);
});
router.post("/login", requesterTypeMiddleware, function (req, res, next) {
  authController.login(req.body, next);
});

router.get("/profile", authMiddleware.verifyToken, function (req, res, next) {
  userController.getUserProfile(req.user.userId, next);
});

router.post(
  "/makecheckout",
  authMiddleware.verifyToken,
  function (req, res, next) {
    checkoutController.makeCheckoutByRandom(req.user.userId, next);
  }
);

router.post(
  "/identifier",
  authMiddleware.verifyToken,
  function (req, res, next) {
    identifierController.createIdentifier(req.user.userId, next);
  }
);

module.exports = router;
