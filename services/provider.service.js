var util = require("util");

var providerModel = require("../models/provider.model");

var createProvider = util.callbackify(providerModel.create).bind(providerModel);

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
