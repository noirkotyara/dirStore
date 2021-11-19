var express = require("express");

var authMiddleware = require("../../middlewares/auth.middleware");
var checkAccessMiddleware = require("../../middlewares/check-access.middleware").checkAccessMiddleware;

var providerController = require("../../controllers/provider");

var providerRouter = express.Router();

providerRouter.post(
  "/item",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function(req, res, next) {
    providerController.createProvider(req.body, next);
  }
);

module.exports = providerRouter;
