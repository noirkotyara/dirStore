var express = require("express");
var router = express.Router();

var requesterTypeMiddleware = require("./../middlewares/requesterType.middleware");
var authMiddleware = require("./../middlewares/auth.middleware");

var authController = require("../controllers/auth/auth.controller");

router.post(
  "/register",
  [requesterTypeMiddleware, authMiddleware.registerUserValidation],
  function (req, res, next) {
    authController.register(req.body, next);
  }
);
router.post(
  "/login",
  [requesterTypeMiddleware, authMiddleware.loginUserValidation],
  function (req, res, next) {
    authController.login(req.body, next);
  }
);

router.get(
  "/profile",
  authMiddleware.verifyToken,
  authController.getProfileInfo
);

module.exports = router;
