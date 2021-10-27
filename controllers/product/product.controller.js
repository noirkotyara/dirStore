var fs = require("fs");
var path = require("path");

var helpers = require("./helpers/readAndWriteFileSync");
var createProduct = require("./helpers/createProduct");

var isEmptySendError = require("./helpers/isEmptyProductResponse");

var responseMiddleware = require("message-catcher");

var productsFilePath = path.resolve(__dirname, "./../../mock/Products.json");

var createItem = function (productInfo, next) {
  try {
    var newProduct = productInfo;

    helpers.readAndWriteFileSync(productsFilePath, createProduct, productInfo);

    next({
      responseCode: responseMiddleware.RESPONSE_CODES.SUCCESS,
      data: { data: newProduct, message: "Product is created successfully!" },
      status: 201,
    });
  } catch (e) {
    next(e);
  }
};

var getList = function (next) {
  var stream = fs.createReadStream(productsFilePath, "utf8");

  stream.on("data", function (data) {
    var productsList = JSON.parse(data);
    return next({
      responseCode: responseMiddleware.RESPONSE_CODES.SUCCESS,
      data: { data: productsList, message: "List of products" },
      status: 200,
    });
  });

  stream.on("error", function () {
    next({
      responseCode: responseMiddleware.RESPONSE_CODES.PROCESS_ERROR,
      data: "Cannot read the file with the list of products",
      status: 500,
    });
  });
};

var getItem = function (productId, next) {
  if (!productId)
    return next({
      responseCode: responseMiddleware.RESPONSE_CODES.PROCESS_ERROR,
      data: "Product id is missing",
      status: 404,
    });

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var foundedProduct = productsList.find(function (item) {
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

var updateItem = function (productId, productFields, next) {
  var preparedProduct = {};

  var updateProduct = function (productsList) {
    var updatedProducts = productsList.map(function (item) {
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

var deleteItem = function (productId, next) {
  var deletedItem = {};

  var deleteProduct = function (productList) {
    var restItems = productList.filter(function (item) {
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
