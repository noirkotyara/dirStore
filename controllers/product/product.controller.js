var path = require("path");

var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;
var CASE_FORMATS = require("./../../enums/formatCase");

var myLodash = require("../../helpers/lodash");
var caseReformator = require("./../../helpers/caseReformator");

var productService = require("../../services/product.service");

var createProduct = function(productInfo, next) {
  try {
    var newProduct = productInfo;

    var f = ff(
      this,
      function() {
        productService.createTable(f);
      },
      function() {
        productService.saveProduct(newProduct, f);
      },
      function() {
        productService.getProductById(arguments[0], f);
      },
      function() {
        var error = arguments[0];
        var results = arguments[1];
        if (error) {
          return f.fail(error);
        }
        caseReformator(results, CASE_FORMATS.SNAKE, f);
      }
    ).onComplete(onCompleteHandler);

    function onCompleteHandler(error, createdProduct) {
      if (error) {
        return next({
          responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
          data: error,
        });
      }

      next({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: createdProduct[0],
          message: "Product is created successfully",
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

var getProductsList = function(next) {
  var f = ff(
    this,
    function() {
      productService.getProductsList(f);
    },
    function() {
      caseReformator(arguments[0], CASE_FORMATS.SNAKE, f);
    }
  ).onComplete(onCompleteHandler);

  function onCompleteHandler(error, productList) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
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

var getProductById = function(productId, next) {
  var f = ff(
    this,
    function() {
      productService.getProductById(productId, f);
    },
    checkAndPrepareProduct
  ).onComplete(onCompleteHandler);

  function checkAndPrepareProduct() {
    var error = arguments[0];
    var results = arguments[1];

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

    caseReformator(results, CASE_FORMATS.SNAKE, f);
  }

  function onCompleteHandler(error, foundedProduct) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: foundedProduct[0],
        message: "Product info with id: " + productId,
      },
    });
  }
};

var updateProduct = function(productId, productFields, next) {
  var f = ff(
    this,
    function() {
      productService.updateProductById(productId, productFields, f);
    },
    checkAndGetProduct,
    checkAndPrepareProduct
  ).onComplete(onCompleteHandler);

  function checkAndGetProduct() {
    var error = arguments[0];
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }

    productService.getProductById(productId, f);
  }

  function checkAndPrepareProduct() {
    var error = arguments[0];
    var results = arguments[1];

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

    caseReformator(results, CASE_FORMATS.SNAKE, f);
  }

  function onCompleteHandler(error, updatedProduct) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: updatedProduct[0],
        message: "Product updated with id: " + productId,
      },
    });
  }
};

var deleteProduct = function(productId, next) {
  var f = ff(
    this,
    function() {
      productService.getProductById(productId, f);
    },
    checkAndDeleteProduct
  ).onComplete(onCompleteHandler);

  function checkAndDeleteProduct() {
    var error = arguments[0];
    var result = arguments[1];
    caseReformator(result, CASE_FORMATS.SNAKE, f);

    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }

    if (myLodash.isEmpty(result)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product with id: " + productId + " is not existed",
      });
    }

    productService.deleteProductById(productId, f);
  }

  function onCompleteHandler(error, deletedProduct) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: deletedProduct[0],
        message: "Product deleted successfully!",
      },
    });
  }
};

module.exports = {
  getProductsList: getProductsList,
  getProductById: getProductById,
  updateProduct: updateProduct,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
};
