var ff = require("ff");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");

var productService = require("../../services/product/product.service");

var getProductById = function (productId, next) {
  var productInfo = {};

  var f = ff(
    this,
    getProductInfo,
    getDeliverersByProductId,
    checkDeliverersList
  ).onComplete(onCompleteHandler);

  function getProductInfo() {
    productService.getProductById(productId, f.slotPlain(2));
  }

  function getDeliverersByProductId(error, products) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        message: error,
      });
    }

    if (myLodash.isEmpty(products)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "Product does not exist",
      });
    }

    productInfo = myLodash.deepClone(products[0]);

    productService.getProductDeliverers(productId, f.slotPlain(2));
  }

  function checkDeliverersList(error, deliverersList) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        message: error,
      });
    }
    productInfo.deliverers = deliverersList.map(function (item) {
      var providerId = item.providerId;
      var preparedItem = myLodash.omit(item, "providerId");
      preparedItem.provider = { id: providerId };
      return preparedItem;
    });
  }

  function onCompleteHandler(error) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: productInfo,
        message: "Deliverer list of the product with id: " + productId,
      },
    });
  }
};

module.exports = getProductById;
