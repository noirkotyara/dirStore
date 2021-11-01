var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var CASE_FORMATS = require("./../../enums/formatCase");

var myLodash = require("./../../helpers/lodash");
var caseReformator = require("./../../helpers/caseReformator");

var providerService = require("../../services/provider.service");
var delivererService = require("../../services/deliverer.service");
var productService = require("../../services/product.service");

var createProvider = function (providerInfo, next) {
  var f = ff(
    this,
    checkDelivererAndProductExistance,
    checkAndCreateProvider,
    checkProviderCreate
  ).onComplete(onCompleteHandler);

  function checkDelivererAndProductExistance() {
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
    providerService.createProvider(providerInfo, f.slotPlain(2));
  }

  function checkProviderCreate(error, providers) {
    if (error) {
      console.log(error);
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    f.pass(caseReformator(providers[0], CASE_FORMATS.SNAKE));
  }

  function onCompleteHandler(error, createdProvider) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: createdProvider,
        message: "Provider is created successfully",
      },
    });
  }
};

var getProvidersList = function (next) {
  var f = ff(
    this,
    function () {
      providerService.getProviderList(f.slotPlain(2));
    },
    checkProvidersList
  ).onComplete(onCompleteHandler);

  function checkProvidersList(error, productsList) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    f.pass(
      productsList.map(function (product) {
        return caseReformator(product.dataValues, CASE_FORMATS.SNAKE);
      })
    );
  }

  function onCompleteHandler(error, productList) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: productList,
        message: "Providers list",
      },
    });
  }
};

var getDelivererProducts = function (delivererId, next) {
  //TODO: fix request
  var f = ff(
    this,
    function () {
      providerService.getDelivererProducts(delivererId, f.slotPlain(2));
    },
    checkProductsList
  ).onComplete(onCompleteHandler);

  function checkProductsList(error, productsList) {
    if (error) {
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
    f.pass(
      productsList.map(function (product) {
        return caseReformator(product.dataValues, CASE_FORMATS.SNAKE);
      })
    );
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
  var f = ff(
    this,
    function () {
      delivererService.getProductDeliverers(productId, f.slotPlain(2));
    },
    checkDeliverersList
  ).onComplete(onCompleteHandler);

  function checkDeliverersList(error, deliverersList) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }

    if (myLodash.isEmpty(deliverersList)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product does not have deliverers",
      });
    }
    f.pass(
      deliverersList.map(function (product) {
        return caseReformator(product, CASE_FORMATS.SNAKE);
      })
    );
  }

  function onCompleteHandler(error, productList) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: productList,
        message: "Deliverer list of the product with id: " + productId,
      },
    });
  }
};

module.exports = {
  createProvider: createProvider,
  getProvidersList: getProvidersList,
  getDelivererProducts: getDelivererProducts,
  getProductDeliverers: getProductDeliverers,
};
