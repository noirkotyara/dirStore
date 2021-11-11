var express = require("express");

var productController = require("../../controllers/product");

var productRouter = express.Router();

productRouter.get("/list", function (req, res, next) {
  productController.getProductsList(next);
});

productRouter.get("/item/:id", function (req, res, next) {
  productController.getProductById(req.params.id, next);
});

module.exports = productRouter;
