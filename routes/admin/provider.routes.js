var express = require("express");

var authMiddleware = require("./../../middlewares/auth.middleware");
var checkAccessMiddleware = require("./../../middlewares/check-access.middleware");

var providerController = require("../../controllers/provider/provider.controller");

var providerRouter = express.Router();

providerRouter.post(
  "/provider",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function (req, res, next) {
    providerController.createProvider(req.body, next);
  }
);

module.exports = providerRouter;
