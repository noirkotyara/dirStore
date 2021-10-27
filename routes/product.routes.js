var express = require("express");

var productController = require("./../controllers/product/product.controller");
var productMiddleware = require("./../middlewares/product.middleware");

var router = express.Router();

router.get("/list", function (req, res, next) {
  productController.getList(next);
});
router.get("/item/:id", function (req, res, next) {
  productController.getItem(req.params.id, next);
});
router.post(
  "/item",
  productMiddleware.createProductValidation,
  function (req, res, next) {
    productController.createItem(req.body, next);
  }
);
router.put(
  "/item/:id",
  productMiddleware.updateProductValidation,
  function (req, res, next) {
    productController.updateItem(req.params.id, req.body, next);
  }
);
router.delete("/item/:id", function (req, res, next) {
  productController.deleteItem(req.params.id, next);
});

module.exports = router;
