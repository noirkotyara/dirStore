var express = require("express");

var productMiddleware = require("./../../middlewares/product.middleware");
var authMiddleware = require("./../../middlewares/auth.middleware");
var checkAccessMiddleware = require("./../../middlewares/check-access.middleware");

var productController = require("../../controllers/product");

var productRouter = express.Router();

productRouter.post(
  "/item",
  [
    authMiddleware.verifyToken,
    checkAccessMiddleware,
    productMiddleware.createProductValidation,
  ],
  function (req, res, next) {
    productController.createProduct(req.body, next);
  }
);

productRouter.put(
  "/item/:id",
  [
    authMiddleware.verifyToken,
    checkAccessMiddleware,
    productMiddleware.updateProductValidation,
  ],
  function (req, res, next) {
    productController.updateProductById(req.params.id, req.body, next);
  }
);

productRouter.delete(
  "/item/:id",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function (req, res, next) {
    productController.deleteProduct(req.params.id, next);
  }
);

module.exports = productRouter;
