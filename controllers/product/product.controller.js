var fs = require("fs");
var path = require("path");

var RESPONSE_CODE = require("./../../enums/responseCodes");

var helpers = require("./helpers/readAndWriteFileSync");
var saveProduct = require("./helpers/saveProduct");
var objHelpers = require("./../../helpers/objectHelpers");

var productsFilePath = path.resolve(__dirname, "./../../mock/Products.json");

var createProduct = function (productInfo, next) {
  try {
    var newProduct = productInfo;

    helpers.readAndWriteFileSync(productsFilePath, saveProduct, productInfo);

    next({
      responseCode: RESPONSE_CODE.SUCCESS__CREATED,
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
      responseCode: RESPONSE_CODE.SUCCESS,
      data: { data: productsList, message: "List of products" },
      status: 200,
    });
  });

  stream.on("error", function () {
    next({
      responseCode: RESPONSE_CODE.S_ERROR_INTERNAL,
      data: "Cannot read the file with the list of products",
    });
  });
};

var getProductById = function (productId, next) {
  if (!productId)
    return next({
      responseCode: RESPONSE_CODE.P_ERROR__NOT_FOUND,
      data: "Product id is missing",
    });

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var foundedProduct = productsList.find(function (item) {
    return item.productId === productId;
  });

  if (objHelpers.isEmpty(foundedProduct))
    return next({
      responseCode: RESPONSE_CODE.P_ERROR__NOT_FOUND,
      data: "Product with id: " + productId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODE.SUCCESS,
    data: {
      data: foundedProduct,
      message: "Product info with id: " + productId,
    },
    status: 200,
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

  if (objHelpers.isEmpty(preparedProduct))
    return next({
      responseCode: RESPONSE_CODE.P_ERROR__NOT_FOUND,
      data: "Product with id: " + productId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODE.SUCCESS,
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

  if (objHelpers.isEmpty(deletedProduct))
    return next({
      responseCode: RESPONSE_CODE.P_ERROR__NOT_FOUND,
      data: "Product with id: " + productId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODE.SUCCESS,
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
