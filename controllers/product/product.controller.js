var fs = require("fs");
var path = require("path");

var helpers = require("./../../helpers/readAndWriteFileSync");
var saveProduct = require("./helpers/saveProduct");

var myLodash = require("../../helpers/lodash");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var productsFilePath = path.resolve(__dirname, "./../../mock/Products.json");

var createProduct = function (productInfo, next) {
  try {
    var newProduct = productInfo;

    helpers.readAndWriteFileSync(productsFilePath, saveProduct, productInfo);

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: { data: newProduct, message: "Product is created successfully!" },
    });
  } catch (e) {
    next(e);
  }
};

var getProductsList = function (next) {
  var stream = fs.createReadStream(productsFilePath, "utf8");

  stream.on("data", function (data) {
    var productsList = JSON.parse(data);
    return next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: { data: productsList, message: "List of products" },
    });
  });

  stream.on("error", function () {
    next({
      responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
      data: "Cannot read the file with the list of products",
    });
  });
};

var getProductById = function (productId, next) {
  if (!productId)
    return next({
      responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
      data: "Product id is missing",
    });

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var foundedProduct = productsList.find(function (item) {
    return item.productId === productId;
  });

  if (myLodash.isEmpty(foundedProduct))
    return next({
      responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
      data: "Product with id: " + productId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODES.SUCCESS,
    data: {
      data: foundedProduct,
      message: "Product info with id: " + productId,
    },
  });
};

var updateProduct = function (productId, productFields, next) {
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

var deleteProduct = function (productId, next) {
  var deletedProduct = {};

  var deleteProduct = function (productList) {
    var restItems = productList.filter(function (currentProduct) {
      var isDeletedProduct = currentProduct.productId === productId;
      if (isDeletedProduct) {
        deletedProduct = currentProduct;
      }
      return !isDeletedProduct;
    });
    return restItems;
  };

  helpers.readAndWriteFileSync(productsFilePath, deleteProduct);

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
