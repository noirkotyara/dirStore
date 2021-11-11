var express = require("express");

var delivererController = require("./../../controllers/deliverer/deliverer.controller");

var delivererRouter = express.Router();

delivererRouter.get("/list", function (req, res, next) {
  delivererController.getDelivererList(next);
});

delivererRouter.get("/item/:id", function (req, res, next) {
  delivererController.getDelivererById(req.params.id, next);
});

module.exports = delivererRouter;
