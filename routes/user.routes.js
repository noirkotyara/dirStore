var express = require("express");
var router = express.Router();
var authController = require("./../controllers/auth.controller");
var requesterTypeMiddleware = require("./../middlewares/requesterType.middleware");
var authMiddleware = require("./../middlewares/auth.middleware");
var userController = require("./../controllers/user.controller");

router.post(
  "/register",
  [requesterTypeMiddleware, authMiddleware.registerUserValidation],
  authController.register
);
router.post(
  "/login",
  [requesterTypeMiddleware, authMiddleware.loginUserValidation],
  authController.login
);

router.get(
  "/profile",
  authMiddleware.verifyToken,
  userController.getProfileInfo
);

module.exports = router;
