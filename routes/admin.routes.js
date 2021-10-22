var express = require("express");
var router = express.Router();
var authController = require("./../controllers/auth.controller");
var requesterTypeMiddleware = require("./../middlewares/requesterType.middleware");

router.post("/login", requesterTypeMiddleware, authController.login);

module.exports = router;
