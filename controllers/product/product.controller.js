var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");
var productReformator = require("./helpers/productCaseReformator");

var productService = require("../../services/product.service");

var createProduct = function (productInfo, next) {
  try {
    var newProduct = productInfo;

    var f = ff(
      this,
      productService.createTable,
      saveProduct,
      getSavedProduct,
      checkAndReformateResultCase
    ).onComplete(onCompleteHandler);

    function saveProduct() {
      productService.saveProduct(newProduct, f.wait());
    }

    function getSavedProduct() {
      productService.getLastCreatedProduct(f.slotPlain(2));
    }

    function checkAndReformateResultCase(error, results) {
      if (error) {
        return f.fail({
          responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
          data: error,
        });
      }
      if (myLodash.isEmpty(results)) {
        return f.fail({
          responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
          data: "Product is not founded",
        });
      }
      var reformatedProduct = productReformator.inCamel(results[0]);
      f.pass(reformatedProduct);
    }

    function onCompleteHandler(error, createdProduct) {
      if (error) {
        return next(next);
      }

      next({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: createdProduct,
          message: "Product is created successfully",
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

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

var getProductById = function (productId, next) {
  var f = ff(this, getProduct, checkAndPrepareProduct).onComplete(
    onCompleteHandler
  );

  function getProduct() {
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

    var reformatedProduct = productReformator.inCamel(results[0]);
    f.pass(reformatedProduct);
  }

  function onCompleteHandler(error, foundedProduct) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: foundedProduct,
        message: "Product info with id: " + productId,
      },
    });
  }
};

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

    var reformatedProduct = productReformator.inCamel(results[0]);
    f.pass(reformatedProduct);
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

var deleteProduct = function (productId, next) {
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

module.exports = {
  getProductsList: getProductsList,
  getProductById: getProductById,
  updateProductById: updateProductById,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
};
