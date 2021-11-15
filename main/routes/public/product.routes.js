var express = require("express");

var productController = require("../../controllers/product");
var reformateFilterOptions = require("../../controllers/product/helpers/filter-options-reformate").reformateFilterOptions;

var productRouter = express.Router();

productRouter.get("/list", function(req, res, next) {
  productController.getProductsList(reformateFilterOptions(req.query), next);
});

productRouter.get("/item/:id", function(req, res, next) {
  productController.getProductById(req.params.id, next);
});

module.exports = productRouter;
