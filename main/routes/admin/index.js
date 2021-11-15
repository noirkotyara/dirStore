var express = require("express");

var authRoutes = require("../common/auth.routes");
var productRoutes = require("./product.routes");
var delivererRoutes = require("./deliverer.routes");
var providerRoutes = require("./provider.routes");

var adminRouter = express.Router();

adminRouter.use("/deliverer", delivererRoutes);
adminRouter.use("/product", productRoutes);
adminRouter.use("/provider", providerRoutes);
adminRouter.use("/auth", authRoutes);

module.exports = adminRouter;
