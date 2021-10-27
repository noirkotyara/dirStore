var uuid = require("uuid");

var pool = require("./connectDB");

var deepClone = require("./../helpers/deepClone");

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
  var productClone = deepClone(product);
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

  pool.mysqlConnection.query(queryFormat, f.slot());
}

function getProductsList(f) {
  var selectQuery = "SELECT * FROM ??";
  var queryFormat = pool.mysqlConnection.format(selectQuery, ["Product"]);

  pool.mysqlConnection.query(queryFormat, f.slot());
}

module.exports = {
  createTable: createTable,
  saveItem: saveProduct,
  getItemById: getProductById,
  getList: getProductsList,
};
