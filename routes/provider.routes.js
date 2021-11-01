var express = require("express");
var router = express.Router();

var providerController = require("./../controllers/provider/provider.controller");

router.get("/list", function (req, res, next) {
  providerController.getProvidersList(next);
});

router.get("/deliverer-products/:delivererId", function (req, res, next) {
  providerController.getDelivererProducts(req.params.delivererId, next);
});

router.get("/products-deliverers/:productId", function (req, res, next) {
  providerController.getProductDeliverers(req.params.productId, next);
});

module.exports = router;
