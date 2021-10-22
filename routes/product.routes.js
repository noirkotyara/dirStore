var express = require("express");
var router = express.Router();
var productController = require("./../controllers/product.controller");

router.get("/list", productController.getList);
router.get("/item/:id", productController.getItem);
router.post("/item", productController.createItem);
router.put("/item/:id", productController.updateItem);
router.delete("/item/:id", productController.deleteItem);

module.exports = router;
