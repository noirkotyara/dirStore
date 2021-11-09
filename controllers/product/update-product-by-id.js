var ff = require("ff");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");

var productService = require("../../services/product/product.service");

var updateProductById = function (productId, productFields, next) {
  var f = ff(
    this,
    updateProduct,
    checkAndGetProduct,
    checkAndPrepareProduct
  ).onComplete(onCompleteHandler);

  function updateProduct() {
    productService.updateProductById(productId, productFields, f.slotPlain(2));
  }

  function checkAndGetProduct(error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        dbData: error,
      });
    }

    productService.getProductById(productId, f.slotPlain(2));
  }

  function checkAndPrepareProduct(error, results) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        dbData: error,
      });
    }

    if (myLodash.isEmpty(results)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "Product with id: " + productId + " is not existed",
      });
    }

    f.pass(results[0]);
  }

  function onCompleteHandler(error, updatedProduct) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: updatedProduct,
        message: "Product updated with id: " + productId,
      },
    });
  }
};

module.exports = updateProductById;
