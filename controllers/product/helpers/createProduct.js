var uuid = require("uuid");

var createProduct = function (productList, newProduct) {
  var updatedProductList = productList.slice(0);

  newProduct["productId"] = uuid.v4();
  newProduct["createDate"] = new Date();

  updatedProductList.push(newProduct);
  return updatedProductList;
};

module.exports = createProduct;
