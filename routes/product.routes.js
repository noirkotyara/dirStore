var express = require("express");

var productMiddleware = require("./../middlewares/product.middleware");

var productController = require("./../controllers/product/product.controller");

var router = express.Router();

router.get("/list", function (req, res, next) {
  productController.getProductsList(next);
});
router.get("/item/:id", function (req, res, next) {
  productController.getProductById(req.params.id, next);
});
router.post(
  "/item",
  productMiddleware.createProductValidation,
  function (req, res, next) {
    productController.createProduct(req.body, next);
  }
);
router.put(
  "/item/:id",
  productMiddleware.updateProductValidation,
  function (req, res, next) {
    productController.updateProductById(req.params.id, req.body, next);
  }
);
router.delete("/item/:id", function (req, res, next) {
  productController.deleteProduct(req.params.id, next);
});

module.exports = router;
