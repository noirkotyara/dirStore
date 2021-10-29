var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var CASE_FORMATS = require("./../../enums/formatCase");

var myLodash = require("../../helpers/lodash");
var caseReformator = require("./../../helpers/caseReformator");

var productService = require("../../services/product.service");

var createProduct = function (productInfo, next) {
  try {
    var newProduct = productInfo;

    var f = ff(
      this,
      productService.createTable,
      function () {
        productService.saveProduct(newProduct, f.wait());
      },
      function () {
        productService.getLastCreatedProduct(f.slotPlain(2));
      },
      function (error, results) {
        if (error) {
          return f.fail(error);
        }
        f.pass(caseReformator(results, CASE_FORMATS.SNAKE));
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

var getProductsList = function (next) {
  var f = ff(
    this,
    function () {
      productService.getProductsList(f.slot());
    },
    function (productsList) {
      f.pass(caseReformator(productsList, CASE_FORMATS.SNAKE));
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

var getProductById = function (productId, next) {
  var f = ff(
    this,
    function () {
      productService.getProductById(productId, f.slotPlain(2));
    },
    checkAndPrepareProduct
  ).onComplete(onCompleteHandler);

  function checkAndPrepareProduct(error, results) {
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

    f.pass(caseReformator(results, CASE_FORMATS.SNAKE));
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

var updateProduct = function (productId, productFields, next) {
  var f = ff(
    this,
    function () {
      productService.updateProductById(
        productId,
        productFields,
        f.slotPlain(2)
      );
    },
    checkAndGetProduct,
    checkAndPrepareProduct
  ).onComplete(onCompleteHandler);

  function checkAndGetProduct(error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }

    productService.getProductById(productId, f.slotPlain(2));
  }

  function checkAndPrepareProduct(error, results) {
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

    f.pass(caseReformator(results, CASE_FORMATS.SNAKE));
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

var deleteProduct = function (productId, next) {
  var f = ff(
    this,
    function () {
      productService.getProductById(productId, f.slotPlain(2));
    },
    checkAndDeleteProduct
  ).onComplete(onCompleteHandler);

  function checkAndDeleteProduct(error, result) {
    f.pass(caseReformator(result, CASE_FORMATS.SNAKE));

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

    productService.deleteProductById(productId, f.slotPlain(2));
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
