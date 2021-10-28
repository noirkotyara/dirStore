var uuid = require("uuid");

var saveDeliverer = function (productList, newDeliverer) {
  var updatedDelivererList = productList.slice(0);

  newDeliverer["delivererId"] = uuid.v4();

  updatedDelivererList.push(newDeliverer);
  return updatedDelivererList;
};

module.exports = saveDeliverer;
