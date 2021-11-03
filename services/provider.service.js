var util = require("util");

var providerModel = require("../models/provider.model");

var createProvider = util.callbackify(providerModel.create).bind(providerModel);

module.exports = {
  createProvider: createProvider,
};
