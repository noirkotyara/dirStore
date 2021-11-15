var createProduct = require("./create-product");
var deleteProduct = require("./delete-product");
var getProductById = require("./get-product-by-id");
var getProductsList = require("./get-products-list").getProductsList;
var updateProductById = require("./update-product-by-id");

module.exports = {
  createProduct: createProduct,
  deleteProduct: deleteProduct,
  getProductById: getProductById,
  updateProductById: updateProductById,
  getProductsList: getProductsList
};
