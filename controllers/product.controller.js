var fs = require("fs");
var lodash = require("lodash");
var path = require("path");
var uuid = require("uuid");
var responseCotroller = require("./response.controller");

var productsFilePath = path.resolve(__dirname, "./../mock/Products.json");

var createItem = function (req, res) {
  var createDate = new Date();
  var newProduct = req.body;

  lodash.set(newProduct, "createDate", createDate);

  /**
   * name
   * price
   * count
   * description
   * createData
   * **/

  if (!newProduct)
    // return responseCotroller.sendResponse(
    //   responseCotroller.RESPONSE_CODE.PROCESS_ERROR,
    //   "Product is empty",
    //   res,
    //   400
    // );
    return res.status(400);

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);
  var id = uuid.v4();

  lodash.set(newProduct, "productId", id);

  productsList.push(newProduct);

  data = JSON.stringify(productsList);

  fs.writeFileSync(productsFilePath, data);

  // return responseCotroller.sendResponse(
  //   responseCotroller.RESPONSE_CODE.BASIC_SUCCESS,
  //   "Product is created successfully!",
  //   newProduct,
  //   201
  // );
  return res.status(201).send(newProduct);
};

var getList = function (req, res) {
  var stream = fs.createReadStream(productsFilePath, "utf8");

  stream.on("data", function (data) {
    var productsList = JSON.parse(data);
    return res.status(200).send(productsList);
  });

  stream.on("error", function (err) {
    return res.status(500).send("Server error");
  });
};

var getItem = function (req, res) {
  var productId = req.params.id;

  if (!productId) return res.sendStatus(404);

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var foundedProduct = productsList.find(function (item) {
    return item.productId === productId;
  });

  return res.status(200).send(foundedProduct);
};

var updateItem = function (req, res) {
  var productId = req.params.id;
  var productFields = req.body;

  if (!productId || !productFields) return res.sendStatus(404);

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

  return res.status(200).send(updatedProduct);
};

var deleteItem = function (req, res) {
  var productId = req.params.id;

  if (!productId) return res.sendStatus(404);

  var data = fs.readFileSync(productsFilePath, "utf8");

  var productsList = JSON.parse(data);

  var deletedItem = {};

  var deletedItems = productsList.filter(function (item) {
    var isDeletedProduct = item.productId !== productId;
    if (isDeletedProduct) {
      deletedItem = item;
    }
    return !isDeletedProduct;
  });

  data = JSON.stringify(deletedItems);

  fs.writeFileSync(productsFilePath, data);

  return res.status(200).send(deletedItem);
};

module.exports = {
  getList: getList,
  getItem: getItem,
  updateItem: updateItem,
  createItem: createItem,
  deleteItem: deleteItem,
};
