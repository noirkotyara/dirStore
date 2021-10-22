var fs = require("fs");
var lodash = require("lodash");
var path = require("path");
var uuid = require("uuid");
var responseController = require("./response.controller");

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

  lodash.set(newProduct, "createDate", createDate);

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);
  var id = uuid.v4();

  lodash.set(newProduct, "productId", id);

  productsList.push(newProduct);

  data = JSON.stringify(productsList);

  fs.writeFileSync(productsFilePath, data);

  return responseController.sendResponse(
    responseController.RESPONSE_CODE.SUCCESS,
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
      responseController.RESPONSE_CODE.SUCCESS,
      { data: productsList, message: "List of products" },
      res,
      200
    );
  });

  stream.on("error", function (err) {
    return responseController.sendResponse(
      responseController.RESPONSE_CODE.PROCESS_ERROR,
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
      responseController.RESPONSE_CODE.PROCESS_ERROR,
      "Product id is missing",
      res,
      404
    );

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var foundedProduct = productsList.find(function (item) {
    return item.productId === productId;
  });

  return responseController.sendResponse(
    responseController.RESPONSE_CODE.SUCCESS,
    { data: foundedProduct, message: "Product info with id: " + productId },
    res,
    200
  );
};

var updateItem = function (req, res) {
  var productId = req.params.id;
  var productFields = req.body;

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var updatedProduct = {};

  var updatedProducts = productsList.map(function (item) {
    if (item.productId === productId) {
      lodash.merge(updatedProduct, item, productFields);
      return updatedProduct;
    }
    return item;
  });

  data = JSON.stringify(updatedProducts);

  fs.writeFileSync(productsFilePath, data);

  return responseController.sendResponse(
    responseController.RESPONSE_CODE.SUCCESS,
    { data: updatedProduct, message: "Product is successfully updated" },
    res,
    200
  );
};

var deleteItem = function (req, res) {
  var productId = req.params.id;

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var deletedItem = {};

  var deletedItems = productsList.filter(function (item) {
    var isDeletedProduct = item.productId === productId;
    if (isDeletedProduct) {
      deletedItem = item;
    }
    return !isDeletedProduct;
  });

  data = JSON.stringify(deletedItems);

  fs.writeFileSync(productsFilePath, data);

  return responseController.sendResponse(
    responseController.RESPONSE_CODE.SUCCESS,
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
