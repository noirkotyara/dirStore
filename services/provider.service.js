var util = require("util");

var providerModel = require("../models/provider.model");
var productModel = require("../models/product.model");

function createProvider(providerInfo, callback) {
  var c = util.callbackify(function () {
    return providerModel.create(providerInfo);
  });
  return c(callback);
}

function getProviderList(callback) {
  var c = util.callbackify(function () {
    return providerModel.findAll();
  });
  return c(callback);
}

function findProviderById(providerId, callback) {
  var c = util.callbackify(function () {
    return providerModel.findOne({ where: { id: providerId } });
  });
  return c(callback);
}

function getDelivererProducts(delivererId, callback) {
  //TODO: fix request
  var c = util.callbackify(function () {
    return productModel.findAll({
      include: [
        {
          model: "Provider",
          where: ["deliverer_id = " + delivererId],
        },
      ],
    });
  });
  return c(callback);
}

module.exports = {
  createProvider: createProvider,
  findProviderById: findProviderById,
  getProviderList: getProviderList,
  getDelivererProducts: getDelivererProducts,
};
