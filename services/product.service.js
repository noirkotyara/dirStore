var uuid = require("uuid");

var pool = require("./connectDB");

var myLodash = require("./../helpers/lodash");
var caseReformator = require("./../helpers/caseReformator");

function createTable(f) {
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

function saveProduct(product, f) {
  var productClone = myLodash.deepClone(product);
  var productId = uuid.v4();
  productClone.id = productId;

  var insertQuery = "INSERT INTO Product SET ?";
  var queryFormat = pool.mysqlConnection.format(insertQuery, productClone);
  pool.mysqlConnection.query(queryFormat, f.wait());

  f.pass(productId);
}

function getProductById(id, f) {
  var selectQuery = "SELECT * FROM ?? WHERE ?? = ?";
  var queryFormat = pool.mysqlConnection.format(selectQuery, [
    "Product",
    "id",
    id,
  ]);

  pool.mysqlConnection.query(queryFormat, f.slotPlain(2));
}

function getProductsList(f) {
  var selectQuery = "SELECT * FROM ??";
  var queryFormat = pool.mysqlConnection.format(selectQuery, ["Product"]);

  pool.mysqlConnection.query(queryFormat, f.slot());
}

function updateProductById(id, fields, f) {
  var reformatedFields = caseReformator(fields);

  var fieldsToSet = Object.keys(reformatedFields)
    .map(function (key) {
      return key + " = ?";
    })
    .join(", ");
  var valuesToSet = Object.values(reformatedFields);

  var updateQuery = "UPDATE Product SET " + fieldsToSet + " WHERE id = ?";

  var queryFormat = pool.mysqlConnection.format(updateQuery, [valuesToSet, id]);

  pool.mysqlConnection.query(queryFormat, f.slotPlain(2));
}

function deleteProductById(id, f) {
  var deleteQuery = "DELETE FROM Product WHERE id = ?";

  var queryFormat = pool.mysqlConnection.format(deleteQuery, [id]);

  pool.mysqlConnection.query(queryFormat, f.slotPlain(2));
}

module.exports = {
  createTable: createTable,
  saveProduct: saveProduct,
  getProductById: getProductById,
  getProductsList: getProductsList,
  updateProductById: updateProductById,
  deleteProductById: deleteProductById,
};
