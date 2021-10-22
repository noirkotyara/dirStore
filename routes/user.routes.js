var express = require("express");
var router = express.Router();
var authController = require("./../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
// router.post("/profile?userId",middleware, authController.register);

module.exports = router;
