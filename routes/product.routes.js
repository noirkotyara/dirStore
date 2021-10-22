var express = require("express");
var router = express.Router();
var productController = require("./../controllers/product.controller");
var productMiddleware = require("./../middlewares/product.middleware");

router.get("/list", productController.getList);
router.get("/item/:id", productController.getItem);
router.post(
  "/item",
  productMiddleware.createProductValidation,
  productController.createItem
);
router.put(
  "/item/:id",
  productMiddleware.updateProductValidation,
  productController.updateItem
);
router.delete("/item/:id", productController.deleteItem);

module.exports = router;
