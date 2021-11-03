var express = require("express");

var authMiddleware = require("./../middlewares/auth.middleware");

var providerController = require("../controllers/provider/provider.controller");

var providerRouter = express.Router();

/**
 * ONLY for ADMIN:
 * post -> /provider
 * **/

providerRouter.post(
  "/provider",
  authMiddleware.verifyToken,
  function (req, res, next) {
    providerController.createProvider(req.body, next);
  }
);

module.exports = providerRouter;
