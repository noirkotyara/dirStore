var express = require("express");

var authMiddleware = require("./../../middlewares/auth.middleware");
var checkAccessMiddleware = require("./../../middlewares/check-access.middleware");

var providerController = require("../../controllers/provider");

var providerRouter = express.Router();

providerRouter.post(
  "/item",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function (req, res, next) {
    providerController.createProvider(req.body, next);
  }
);

providerRouter.get(
  "/item/:id",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function (req, res, next) {
    providerController.getProviderInfo(req.params.id, next);
  }
);

module.exports = providerRouter;
