var express = require("express");

var providerController = require("../../controllers/provider");
var reformateFilterOptions = require("../../controllers/product/helpers/filter-options-reformate").reformateFilterOptions;

var providerRouter = express.Router();

providerRouter.get(
  "/item/:id",
  function(req, res, next) {
    providerController.getProviderInfo(req.params.id, next);
  }
);

providerRouter.get(
  "/list",
  function(req, res, next) {
    providerController.getProviderListInfo(reformateFilterOptions(req.query), next);
  }
);

module.exports = providerRouter;
