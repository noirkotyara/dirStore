var fs = require("fs");
var lodash = require("lodash");
var path = require("path");
var uuid = require("uuid");
var responseController = require("response-controller");
var service = require("./../services/services");
var isEmptyHandlerError = require("./../helpers/isEmptyHandlerError");

var productsFilePath = path.resolve(__dirname, "./../mock/Products.json");

var createItem = function (req, res) {
  var createDate = new Date();
  /**
   * name
   * price
   * count
   * description
   * createData
   * **/
  var newProduct = req.body;

  var createProduct = function (productList) {
    var updatedProductList = lodash.cloneDeep(productList);
    var id = uuid.v4();
    lodash.set(newProduct, "createDate", createDate);
    lodash.set(newProduct, "productId", id);
    updatedProductList.push(newProduct);
    return updatedProductList;
  };

  service.readAndWriteFileSync(productsFilePath, createProduct);

  return responseController.sendResponse(
    responseController.RESPONSE_CODES.SUCCESS,
    { data: newProduct, message: "Product is created successfully!" },
    res,
    201
  );
};

var getList = function (req, res) {
  var stream = fs.createReadStream(productsFilePath, "utf8");

  stream.on("data", function (data) {
    var productsList = JSON.parse(data);
    return responseController.sendResponse(
      responseController.RESPONSE_CODES.SUCCESS,
      { data: productsList, message: "List of products" },
      res,
      200
    );
  });

  stream.on("error", function (err) {
    return responseController.sendResponse(
      responseController.RESPONSE_CODES.PROCESS_ERROR,
      "Cannot read the file with the list of products",
      res,
      500
    );
  });
};

var getItem = function (req, res) {
  var productId = req.params.id;

  if (!productId)
    return responseController.sendResponse(
      responseController.RESPONSE_CODES.PROCESS_ERROR,
      "Product id is missing",
      res,
      404
    );

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var foundedProduct = productsList.find(function (item) {
    return item.productId === productId;
  });

  isEmptyHandlerError(foundedProduct, res);

  return responseController.sendResponse(
    responseController.RESPONSE_CODES.SUCCESS,
    { data: foundedProduct, message: "Product info with id: " + productId },
    res,
    200
  );
};

var updateItem = function (req, res) {
  var productId = req.params.id;
  var productFields = req.body;
  var updatedProduct = {};

  var updateProduct = function (productsList) {
    var updatedProducts = productsList.map(function (item) {
      if (item.productId === productId) {
        lodash.merge(updatedProduct, item, productFields);
        return updatedProduct;
      }
      return item;
    });
    return updatedProducts;
  };

  service.readAndWriteFileSync(productsFilePath, updateProduct);

  isEmptyHandlerError(updatedProduct, res);

  return responseController.sendResponse(
    responseController.RESPONSE_CODES.SUCCESS,
    { data: updatedProduct, message: "Product is successfully updated" },
    res,
    200
  );
};

var deleteItem = function (req, res) {
  var productId = req.params.id;

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

  service.readAndWriteFileSync(productsFilePath, deleteProduct);

  isEmptyHandlerError(deletedItem, res);

  return responseController.sendResponse(
    responseController.RESPONSE_CODES.SUCCESS,
    { data: deletedItem, message: "Product is successfully deleted" },
    res,
    200
  );
};

module.exports = {
  getList: getList,
  getItem: getItem,
  updateItem: updateItem,
  createItem: createItem,
  deleteItem: deleteItem,
};
