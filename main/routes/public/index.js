var express = require("express");

var authRoutes = require("../common/auth.routes");
var delivererRoutes = require("./deliverer.routes");
var productRoutes = require("./product.routes");

var publicRouter = express.Router();

publicRouter.use("/auth", authRoutes);
publicRouter.use("/product", productRoutes);
publicRouter.use("/deliverer", delivererRoutes);

module.exports = publicRouter;
