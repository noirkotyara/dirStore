var express = require("express");

var productMiddleware = require("./../middlewares/product.middleware");
var authMiddleware = require("./../middlewares/auth.middleware");

var productController = require("./../controllers/product/product.controller");

var productRouter = express.Router();

/**
 * PUBLIC routes:
 * get -> /list
 * get -> /item/:id
 *
 * ONLY for ADMIN:
 * post/put/delete -> /item/:id
 * **/

productRouter.get("/list", function (req, res, next) {
  productController.getProductsList(next);
});

productRouter.get("/item/:id", function (req, res, next) {
  productController.getProductById(req.params.id, next);
});

productRouter.post(
  "/item",
  [authMiddleware.verifyToken, productMiddleware.createProductValidation],
  function (req, res, next) {
    productController.createProduct(req.body, next);
  }
);

productRouter.put(
  "/item/:id",
  [authMiddleware.verifyToken, productMiddleware.updateProductValidation],
  function (req, res, next) {
    productController.updateProductById(req.params.id, req.body, next);
  }
);

productRouter.delete(
  "/item/:id",
  authMiddleware.verifyToken,
  function (req, res, next) {
    productController.deleteProduct(req.params.id, next);
  }
);

module.exports = productRouter;
