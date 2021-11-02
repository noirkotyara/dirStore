var util = require("util");

var providerModel = require("../models/provider.model");
var productModel = require("../models/product.model");
var delivererModel = require("../models/deliverer.model");

function createProvider(providerInfo, callback) {
  var c = util.callbackify(function () {
    return providerModel.create(providerInfo);
  });
  return c(callback);
}

function getProviderList(callback) {
  var c = util.callbackify(function () {
    return providerModel.findAll({
      include: [delivererModel],
    });
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
  var c = util.callbackify(function () {
    return delivererModel.findOne({
      where: {
        id: delivererId,
      },
      include: {
        model: productModel,
        as: "products",
        through: {
          attributes: [],
        },
      },
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
