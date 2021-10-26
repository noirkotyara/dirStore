var express = require("express");

var productController = require("../controllers/product.controller");
var productMiddleware = require("./../middlewares/product.middleware");

var router = express.Router();

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
