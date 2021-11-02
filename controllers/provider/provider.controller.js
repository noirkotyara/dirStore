var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("./../../helpers/lodash");

var providerService = require("../../services/provider.service");
var delivererService = require("../../services/deliverer.service");
var productService = require("../../services/product.service");

var createProvider = function (providerInfo, next) {
  var f = ff(
    this,
    checkDelivererAndProductExistence,
    checkAndCreateProvider,
    checkProviderCreate
  ).onComplete(onCompleteHandler);

  function checkDelivererAndProductExistence() {
    delivererService.getDelivererById(providerInfo.delivererId, f.slotPlain(2));
    productService.isProductExist(providerInfo.productId, f.slotPlain(2));
  }

  function checkAndCreateProvider(
    errorDeliverer,
    deliverer,
    errorProduct,
    product
  ) {
    if (errorDeliverer || errorProduct) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: errorDeliverer || errorProduct,
      });
    }
    if (myLodash.isEmpty(deliverer)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data:
          "Deliverer with id: " + providerInfo.delivererId + " is not existed",
      });
    }
    if (myLodash.isEmpty(product)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product with id: " + providerInfo.productId + " is not existed",
      });
    }
    providerService.createProvider(providerInfo, f.slotPlain(1));
  }

  function checkProviderCreate(error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
  }

  function onCompleteHandler(error) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.BASIC_SUCCESS__CREATED,
      data: "Provider is created successfully",
    });
  }
};

var getDelivererProducts = function (delivererId, next) {
  var f = ff(this, getDeliverers, checkProductsList).onComplete(
    onCompleteHandler
  );

  function getDeliverers() {
    providerService.getDelivererProducts(delivererId, f.slotPlain(2));
  }

  function checkProductsList(error, productsList) {
    if (error) {
      console.log(error);
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    if (myLodash.isEmpty(productsList)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Deliverer does not have products to deliver",
      });
    }
    console.log(productsList);
    f.pass(productsList);
  }

  function onCompleteHandler(error, productList) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: productList,
        message: "Product list of the deliverer with id: " + delivererId,
      },
    });
  }
};

var getProductDeliverers = function (productId, next) {
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
        data: error,
      });
    }

    if (myLodash.isEmpty(products)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product does not exist",
      });
    }

    productInfo = myLodash.deepClone(products[0]);

    delivererService.getProductDeliverers(productId, f.slotPlain(2));
  }

  function checkDeliverersList(error, deliverersList) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    productInfo.deliverers = deliverersList;
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

module.exports = {
  createProvider: createProvider,
  getDelivererProducts: getDelivererProducts,
  getProductDeliverers: getProductDeliverers,
};
