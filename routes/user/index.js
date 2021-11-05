var express = require("express");

var authRoutes = require("../common/auth.routes");
var checkoutRoutes = require("./checkout.routes");

var userRoutes = express.Router();

userRoutes.use("/auth", authRoutes);
userRoutes.use("/checkout", checkoutRoutes);

module.exports = userRoutes;
