var express = require("express");

var delivererMiddleware = require("./../middlewares/deliverer.middleware");

var delivererController = require("./../controllers/deliverer/deliverer.controller");

var router = express.Router();

router.get("/list", function (req, res, next) {
  delivererController.getDelivererList(next);
});
router.get("/item/:id", function (req, res, next) {
  delivererController.getDelivererById(req.params.id, next);
});
router.post(
  "/item",
  delivererMiddleware.createDelivererValidation,
  function (req, res, next) {
    delivererController.createDeliverer(req.body, next);
  }
);
router.put(
  "/item/:id",
  delivererMiddleware.updateDelivererValidation,
  function (req, res, next) {
    delivererController.updateDeliverer(req.params.id, req.body, next);
  }
);
router.delete("/item/:id", function (req, res, next) {
  delivererController.deleteDeliverer(req.params.id, next);
});

module.exports = router;
