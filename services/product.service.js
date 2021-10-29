var uuid = require("uuid");
var ff = require("ff");
var pool = require("./connectDB");

var myLodash = require("./../helpers/lodash");
var caseReformator = require("./../helpers/caseReformator");

function createTable() {
  var f = ff(this);

  var createTableQuery =
    "CREATE TABLE IF NOT EXISTS Product\n" +
    "(\n" +
    "    Id VARCHAR(36) PRIMARY KEY NOT NULL,\n" +
    "    Name VARCHAR(30) NOT NULL,\n" +
    "    Description VARCHAR(100),\n" +
    "    Price DECIMAL(7,2) UNSIGNED DEFAULT 0,\n" +
    "    Amount INT DEFAULT 0,\n" +
    "    CreateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n" +
    ");";
  pool.mysqlConnection.query(createTableQuery, f.wait());
}

function saveProduct(product, callback) {
  var productClone = myLodash.deepClone(product);
  productClone.id = uuid.v4();

  var insertQuery = "INSERT INTO Product SET ?";
  var queryFormat = pool.mysqlConnection.format(insertQuery, productClone);
  pool.mysqlConnection.query(queryFormat, callback);
}

function getLastCreatedProduct(callback) {
  var selectLastInsertedQuery =
    "SELECT * FROM Product WHERE id= LAST_INSERT_ID()";

  pool.mysqlConnection.query(selectLastInsertedQuery, callback);
}

function getProductById(id, callback) {
  var selectQuery = "SELECT * FROM ?? WHERE ?? = ?";
  var queryFormat = pool.mysqlConnection.format(selectQuery, [
    "Product",
    "id",
    id,
  ]);

  pool.mysqlConnection.query(queryFormat, callback);
}

function getProductsList(callback) {
  var selectQuery = "SELECT * FROM ??";
  var queryFormat = pool.mysqlConnection.format(selectQuery, ["Product"]);

  pool.mysqlConnection.query(queryFormat, callback);
}

function updateProductById(id, fields, callback) {
  var reformatedFields = caseReformator(fields);

  var fieldsToSet = Object.keys(reformatedFields)
    .map(function (key) {
      return key + " = ?";
    })
    .join(", ");
  var valuesToSet = Object.values(reformatedFields);

  var updateQuery = "UPDATE Product SET " + fieldsToSet + " WHERE id = ?";

  var queryFormat = pool.mysqlConnection.format(updateQuery, [valuesToSet, id]);

  pool.mysqlConnection.query(queryFormat, callback);
}

function deleteProductById(id, callback) {
  var deleteQuery = "DELETE FROM Product WHERE id = ?";

  var queryFormat = pool.mysqlConnection.format(deleteQuery, [id]);

  pool.mysqlConnection.query(queryFormat, callback);
}

module.exports = {
  createTable: createTable,
  saveProduct: saveProduct,
  getProductById: getProductById,
  getProductsList: getProductsList,
  updateProductById: updateProductById,
  deleteProductById: deleteProductById,
  getLastCreatedProduct: getLastCreatedProduct,
};
