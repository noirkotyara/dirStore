var getProviderInfo = require("./get-provider-info").getProviderInfo;
var getProviderListInfo = require("./get-provider-list-info").getProviderListInfo;
var createProvider = require("./create-provider");

module.exports = {
  getProviderListInfo: getProviderListInfo,
  getProviderInfo: getProviderInfo,
  createProvider: createProvider
};
