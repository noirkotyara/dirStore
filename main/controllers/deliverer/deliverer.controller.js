var uuid = require("uuid");
var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");

var delivererReformator = require("./helpers/deliverer-case-reformator");

var delivererService = require("../../services/deliverer/deliverer.service");

var createDeliverer = function(delivererInfo, next) {
  var delivererId = uuid.v4();
  var preparedDelivererInfo = myLodash.deepClone(delivererInfo);
  preparedDelivererInfo.id = delivererId;

  var f = ff(
    this,
    createDelivererItem,
    checkAndGetDeliverer,
    checkAndReformateCaseOfResult
  ).onComplete(onCompleteHandler);

  function createDelivererItem() {
    delivererService.createDeliverer(preparedDelivererInfo, f.slotPlain(2));
  }

  function checkAndGetDeliverer(error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        message: error
      });
    }
    delivererService.getDelivererById(delivererId, f.slotPlain(2));
  }

  function checkAndReformateCaseOfResult(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        message: error
      });
    }
    if (myLodash.isEmpty(deliverers)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "Deliverer with id: " + delivererId + " is not existed"
      });
    }

    f.pass(delivererReformator.inCamel(deliverers[0]));
  }

  function onCompleteHandler(error, createdDeliverer) {
    if (error) {
      next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: createdDeliverer,
        message: "Deliverer is created successfully!"
      }
    });
  }
};

var updateDeliverer = function(delivererId, delivererFields, next) {
  var f = ff(
    this,
    updateDelivererById,
    checkAndGetUpdatedDeliverer,
    checkAndReformateCaseOfResult
  ).onComplete(onCompleteHandler);

  function updateDelivererById() {
    delivererService.updateDelivererById(
      delivererId,
      delivererFields,
      f.slotPlain(2)
    );
  }

  function checkAndGetUpdatedDeliverer(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: error
      });
    }
    if (myLodash.isEmpty(deliverers)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "Deliverer with id: " + delivererId + " is not existed"
      });
    }

    delivererService.getDelivererById(delivererId, f.slotPlain(2));
  }

  function checkAndReformateCaseOfResult(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: error
      });
    }
    f.pass(delivererReformator.inCamel(deliverers[0]));
  }

  function onCompleteHandler(error, updatedDeliverer) {
    if (error) {
      return next(error);
    }
    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: updatedDeliverer,
        message: "Deliverer with id: " + delivererId + " successfully updated!"
      }
    });
  }
};

var deleteDeliverer = function(delivererId, next) {
  var deletedDelivery = {};

  var f = ff(
    this,
    getDeliverer,
    checkAndDeleteDeliverer,
    checkAndReformateCaseOfResult
  ).onComplete(onCompleteHandler);

  function getDeliverer() {
    delivererService.getDelivererById(delivererId, f.slotPlain(2));
  }

  function checkAndDeleteDeliverer(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: error
      });
    }
    if (myLodash.isEmpty(deliverers)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "Deliverer with id: " + delivererId + " is not existed"
      });
    }

    deletedDelivery = deliverers[0];
    delivererService.deleteDelivererById(delivererId, f.wait());
  }

  function checkAndReformateCaseOfResult(error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: error
      });
    }
    f.pass(delivererReformator.inCamel(deletedDelivery));
  }

  function onCompleteHandler(error, deletedDeliverer) {
    if (error) {
      return next(error);
    }
    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: deletedDeliverer,
        message: "Deliverer with id: " + delivererId + " successfully deleted!"
      }
    });
  }
};

var getDelivererById = function(delivererId, next) {
  var f = ff(this, getDeliverers, checkProductsList).onComplete(
    onCompleteHandler
  );

  function getDeliverers() {
    delivererService.getDelivererProducts(delivererId, f.slotPlain(2));
  }

  function checkProductsList(error, productsList) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        message: error.message
      });
    }
    if (myLodash.isEmpty(productsList)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "Deliverer does not have products to deliver"
      });
    }

    f.pass(productsList);
  }

  function onCompleteHandler(error, productList) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: productList,
        message: "Product list of the deliverer with id: " + delivererId
      }
    });
  }
};

module.exports = {
  getDelivererById: getDelivererById,
  updateDeliverer: updateDeliverer,
  createDeliverer: createDeliverer,
  deleteDeliverer: deleteDeliverer
};
