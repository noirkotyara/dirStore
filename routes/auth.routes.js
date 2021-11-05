var express = require("express");

var requesterTypeMiddleware = require("../middlewares/requester-type.middleware");
var authMiddleware = require("./../middlewares/auth.middleware");

var authController = require("./../controllers/auth/auth.controller");

var authRouter = express.Router();

/** routes for ADMIN or USER type of requester **/

authRouter.post(
  "/register/:type",
  requesterTypeMiddleware,
  function (req, res, next) {
    authController.register(req.body, next);
  }
);

authRouter.post("/login", function (req, res, next) {
  authController.login(req.body, next);
});

authRouter.get(
  "/profile",
  authMiddleware.verifyToken,
  function (req, res, next) {
    authController.getUserProfile(req.user.userId, next);
  }
);

module.exports = authRouter;
