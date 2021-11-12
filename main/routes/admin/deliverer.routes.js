var express = require("express");

var delivererMiddleware = require("../../middlewares/deliverer.middleware");
var authMiddleware = require("../../middlewares/auth.middleware");
var checkAccessMiddleware = require("../../middlewares/check-access.middleware");

var delivererController = require("../../controllers/deliverer");

var delivererRouter = express.Router();

delivererRouter.post(
  "/item",
  [
    authMiddleware.verifyToken,
    checkAccessMiddleware,
    delivererMiddleware.createDelivererValidation
  ],
  function(req, res, next) {
    delivererController.createDeliverer(req.body, next);
  }
);
delivererRouter.put(
  "/item/:id",
  [
    authMiddleware.verifyToken,
    checkAccessMiddleware,
    delivererMiddleware.updateDelivererValidation
  ],
  function(req, res, next) {
    delivererController.updateDeliverer(req.params.id, req.body, next);
  }
);
delivererRouter.delete(
  "/item/:id",
  [authMiddleware.verifyToken, checkAccessMiddleware],
  function(req, res, next) {
    delivererController.deleteDeliverer(req.params.id, next);
  }
);

module.exports = delivererRouter;
