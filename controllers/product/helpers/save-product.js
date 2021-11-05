var uuid = require("uuid");

var saveProduct = function (productList, newProduct) {
  var updatedProductList = productList.slice(0);

  newProduct["productId"] = uuid.v4();
  newProduct["createDate"] = new Date();

  updatedProductList.push(newProduct);
  return updatedProductList;
};

module.exports = saveProduct;
