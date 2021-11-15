var express = require("express");

var delivererController = require("../../controllers/deliverer");
var reformateFilterOptions = require("../../controllers/product/helpers/filter-options-reformate").reformateFilterOptions;

var delivererRouter = express.Router();

delivererRouter.get("/list", function(req, res, next) {
  delivererController.getDelivererList(reformateFilterOptions(req.query), next);
});

delivererRouter.get("/item/:id", function(req, res, next) {
  delivererController.getDelivererById(req.params.id, next);
});

module.exports = delivererRouter;
