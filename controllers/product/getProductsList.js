var ff = require("ff");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var productReformator = require("./helpers/product-case-reformator");

var productService = require("../../services/product.service");

var getProductsList = function (next) {
  var f = ff(this, getProducts, checkAndReformateResults).onComplete(
    onCompleteHandler
  );

  function getProducts() {
    productService.getProductsList(f.slotPlain(2));
  }

  function checkAndReformateResults(error, productLists) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }
    var reformatedProductsList = productLists.map(function (item) {
      return productReformator.inCamel(item);
    });
    f.pass(reformatedProductsList);
  }

  function onCompleteHandler(error, productList) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: productList,
        message: "Products list",
      },
    });
  }
};

module.exports = getProductsList;
