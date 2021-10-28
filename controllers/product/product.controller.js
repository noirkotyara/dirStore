var path = require("path");

var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;
var CASE_FORMATS = require("./../../enums/formatCase");

var myLodash = require("../../helpers/lodash");
var readAndWriteFileSync = require("./../../helpers/readAndWriteFileSync");
var caseReformator = require("./../../helpers/caseReformator");

var productService = require("../../services/product.service");

var productsFilePath = path.resolve(__dirname, "./../../mock/Products.json");

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
        caseReformator(arguments[0], CASE_FORMATS.SNAKE, f);
      }
    ).onComplete(onCompleteHandler);

    function onCompleteHandler(err, createdProduct) {
      if (err) {
        return next({
          responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
          data: err.message,
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

  function onCompleteHandler(err, productList) {
    if (err) {
      return next({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: err.message,
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
  //TODO: fix
  var f = ff(
    this,
    function() {
      getProductById(productId, f);
    },
    function() {
      caseReformator(arguments[0], CASE_FORMATS.SNAKE, f);
    }
  ).onComplete(onCompleteHandler);

  function onCompleteHandler(error, foundedProduct) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error.message,
      });
    }

    console.log(foundedProduct);
    if (myLodash.isEmpty(foundedProduct)) {
      next({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product with id: " + productId + " is not existed",
      });
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
  var preparedProduct = {};

  var updateProduct = function(productsList) {
    var updatedProducts = productsList.map(function(item) {
      if (item.productId === productId) {
        Object.assign(preparedProduct, item, productFields);
        return preparedProduct;
      }
      return item;
    });
    return updatedProducts;
  };

  readAndWriteFileSync(productsFilePath, updateProduct);

  if (myLodash.isEmpty(preparedProduct))
    return next({
      responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
      data: "Product with id: " + productId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODES.SUCCESS,
    data: {
      data: preparedProduct,
      message: "Product is successfully updated",
    },
  });
};

var deleteProduct = function(productId, next) {
  var deletedProduct = {};

  var deleteProduct = function(productList) {
    var restItems = productList.filter(function(currentProduct) {
      var isDeletedProduct = currentProduct.productId === productId;
      if (isDeletedProduct) {
        deletedProduct = currentProduct;
      }
      return !isDeletedProduct;
    });
    return restItems;
  };

  readAndWriteFileSync(productsFilePath, deleteProduct);

  if (myLodash.isEmpty(deletedProduct))
    return next({
      responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
      data: "Product with id: " + productId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODES.SUCCESS,
    data: {
      data: deletedProduct,
      message: "Product is successfully deleted",
    },
  });
};

module.exports = {
  getProductsList: getProductsList,
  getProductById: getProductById,
  updateProduct: updateProduct,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
};
