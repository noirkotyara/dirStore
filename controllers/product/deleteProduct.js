var ff = require("ff");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");
var productReformator = require("./helpers/product-case-reformator");

var productService = require("../../services/product.service");

var deleteProduct = function(productId, next) {
  var f = ff(this, getProduct, checkAndDeleteProduct).onComplete(
    onCompleteHandler
  );

  function getProduct() {
    productService.getProductById(productId, f.slotPlain(2));
  }

  function checkAndDeleteProduct(error, results) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }

    if (myLodash.isEmpty(results)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product with id: " + productId + " is not existed",
      });
    }
    var reformatedProduct = productReformator.inCamel(results[0]);
    f.pass(reformatedProduct);

    productService.deleteProductById(productId, f.slot());
  }

  function onCompleteHandler(error, deletedProduct) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: deletedProduct,
        message: "Product deleted successfully!",
      },
    });
  }
};

module.exports = deleteProduct

