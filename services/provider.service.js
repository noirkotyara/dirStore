var util = require("util");

var providerModel = require("../models/provider.model");

function createProvider(providerInfo, callback) {
  var c = util.callbackify(function () {
    return providerModel.create(providerInfo);
  });
  return c(callback);
}

function findProviderById(providerId, callback) {
  var c = util.callbackify(function () {
    return providerModel.findOne({ where: { id: providerId } });
  });
  return c(callback);
}

module.exports = {
  createProvider: createProvider,
  findProviderById: findProviderById,
};
