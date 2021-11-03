var express = require("express");

var delivererMiddleware = require("./../middlewares/deliverer.middleware");
var authMiddleware = require("./../middlewares/auth.middleware");

var delivererController = require("./../controllers/deliverer/deliverer.controller");

var delivererRouter = express.Router();

/**
 * PUBLIC routes:
 * get -> /list
 * get -> /item/:id
 *
 * ONLY for ADMIN:
 * post/put/delete -> /item/:id
 * **/

delivererRouter.get("/list", function (req, res, next) {
  delivererController.getDelivererList(next);
});

delivererRouter.get("/item/:id", function (req, res, next) {
  delivererController.getDelivererById(req.params.id, next);
});

delivererRouter.post(
  "/item",
  [authMiddleware.verifyToken, delivererMiddleware.createDelivererValidation],
  function (req, res, next) {
    delivererController.createDeliverer(req.body, next);
  }
);
delivererRouter.put(
  "/item/:id",
  [authMiddleware.verifyToken, delivererMiddleware.updateDelivererValidation],
  function (req, res, next) {
    delivererController.updateDeliverer(req.params.id, req.body, next);
  }
);
delivererRouter.delete(
  "/item/:id",
  authMiddleware.verifyToken,
  function (req, res, next) {
    delivererController.deleteDeliverer(req.params.id, next);
  }
);

module.exports = delivererRouter;
