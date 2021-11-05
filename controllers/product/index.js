var createProduct = require("./createProduct");
var deleteProduct = require("./deleteProduct");
var getProductById = require("./getProductById");
var getProductsList = require("./getProductsList");
var updateProductById = require("./updateProductById");

module.exports = {
  createProduct: createProduct,
  deleteProduct: deleteProduct,
  getProductById: getProductById,
  updateProductById: updateProductById,
  getProductsList: getProductsList,
};
