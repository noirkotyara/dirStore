var fs = require("fs");
var path = require("path");

var ff = require("ff");

var responseMiddleware = require("message-catcher");

var helpers = require("./helpers/readAndWriteFileSync");

var isEmptySendError = require("./helpers/isEmptyProductResponse");

var productService = require("../../services/product.service");

var productsFilePath = path.resolve(__dirname, "./../../mock/Products.json");

var createItem = function(productInfo, next) {
  try {
    var newProduct = productInfo;

    var f = ff(
      this,
      function() {
        productService.createTable(f);
      },
      function() {
        productService.saveItem(newProduct, f);
      },
      function() {
        productService.getItemById(arguments[0], f);
      }
    ).onComplete(onCompleteHandler);

    function onCompleteHandler(err, createdProduct) {
      if (err) {
        return next({
          responseCode: responseMiddleware.RESPONSE_CODES.DB_ERROR,
          data: err.message,
          status: 404,
        });
      }

      next({
        responseCode: responseMiddleware.RESPONSE_CODES.SUCCESS,
        data: {
          data: createdProduct[0],
          message: "Product is created successfully",
        },
        status: 201,
      });
    }
  } catch (e) {
    next(e);
  }
};

var getList = function(next) {

  var f = ff(this, function() {
    productService.getList(f)
  }).onComplete(onCompleteHandler)

  function onCompleteHandler(err, productList) {
    if (err) {
      return next({
        responseCode: responseMiddleware.RESPONSE_CODES.DB_ERROR,
        data: err.message,
        status: 404,
      });
    }

    next({
      responseCode: responseMiddleware.RESPONSE_CODES.SUCCESS,
      data: {
        data: productList,
        message: "Products list",
      },
      status: 200,
    });
  }
};

var getItem = function(productId, next) {
  if (!productId)
    return next({
      responseCode: responseMiddleware.RESPONSE_CODES.PROCESS_ERROR,
      data: "Product id is missing",
      status: 404,
    });

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var foundedProduct = productsList.find(function(item) {
    return item.productId === productId;
  });

  isEmptySendError(productId, foundedProduct, next);

  next({
    responseCode: responseMiddleware.RESPONSE_CODES.SUCCESS,
    data: {
      data: foundedProduct,
      message: "Product info with id: " + productId,
    },
    status: 200,
  });
};

var updateItem = function(productId, productFields, next) {
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

  helpers.readAndWriteFileSync(productsFilePath, updateProduct);

  isEmptySendError(productId, preparedProduct, next);

  next({
    responseCode: responseMiddleware.RESPONSE_CODES.SUCCESS,
    data: {
      data: preparedProduct,
      message: "Product is successfully updated",
    },
    status: 200,
  });
};

var deleteItem = function(productId, next) {
  var deletedItem = {};

  var deleteProduct = function(productList) {
    var restItems = productList.filter(function(item) {
      var isDeletedProduct = item.productId === productId;
      if (isDeletedProduct) {
        deletedItem = item;
      }
      return !isDeletedProduct;
    });
    return restItems;
  };

  helpers.readAndWriteFileSync(productsFilePath, deleteProduct);

  isEmptySendError(productId, deletedItem, next);

  next({
    responseCode: responseMiddleware.RESPONSE_CODES.SUCCESS,
    data: {
      data: deletedItem,
      message: "Product is successfully deleted",
    },
    status: 200,
  });
};

module.exports = {
  getList: getList,
  getItem: getItem,
  updateItem: updateItem,
  createItem: createItem,
  deleteItem: deleteItem,
};
