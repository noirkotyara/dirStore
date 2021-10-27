var express = require("express");
var router = express.Router();
var authController = require("../controllers/auth/auth.controller");
var requesterTypeMiddleware = require("./../middlewares/requesterType.middleware");

router.post("/login", requesterTypeMiddleware, function (req, res, next) {
  authController.login(req.body, next);
});
router.post("/register", requesterTypeMiddleware, function (req, res, next) {
  authController.register(req.body, next);
});

module.exports = router;
