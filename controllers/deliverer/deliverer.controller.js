var fs = require("fs");

var uuid = require("uuid");
var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");

var caseReformator = require("./../../helpers/caseReformator");

var delivererService = require("./../../services/deliverer.service");

var createDeliverer = function (delivererInfo, next) {
  var delivererId = uuid.v4();
  var preparedDelivererInfo = myLodash.deepClone(delivererInfo);
  preparedDelivererInfo.id = delivererId;

  var f = ff(
    this,
    function () {
      delivererService.createDeliverer(preparedDelivererInfo, f.slotPlain(2));
    },
    checkAndGetDeliverer,
    checkAndReformateCaseOfResult
  ).onComplete(onCompleteHandler);

  function checkAndGetDeliverer(error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    delivererService.getDelivererById(delivererId, f.slotPlain(2));
  }

  function checkAndReformateCaseOfResult(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    f.pass(caseReformator(deliverers[0], "SNAKE"));
  }

  function onCompleteHandler(error, createdDeliverer) {
    if (error) {
      next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: createdDeliverer,
        message: "Deliverer is created successfully!",
      },
    });
  }
};

var getDelivererList = function (next) {
  var f = ff(
    this,
    function () {
      delivererService.getDelivererList(f.slotPlain(2));
    },
    checkAndReformateCaseOfList
  ).onComplete(onCompleteHandler);

  function checkAndReformateCaseOfList(error, res) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }
    f.pass(caseReformator(res, "SNAKE"));
  }

  function onCompleteHandler(error, res) {
    if (error) {
      next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: res,
        message: "Deliverer is created successfully!",
      },
    });
  }
};

var getDelivererById = function (delivererId, next) {
  var f = ff(
    this,
    function () {
      delivererService.getDelivererById(delivererId, f.slotPlain(2));
    },
    checkAndReformateCaseOfResult
  ).onComplete(onCompleteHandler);

  function checkAndReformateCaseOfResult(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }
    if (myLodash.isEmpty(deliverers)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Deliverer with id: " + delivererId + " is not existed",
      });
    }
    f.pass(caseReformator(deliverers[0], "SNAKE"));
  }

  function onCompleteHandler(error, foundedDeliverer) {
    if (error) {
      return next(error);
    }
    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: foundedDeliverer,
        message: "Deliverer info with id: " + delivererId,
      },
    });
  }
};

var updateDeliverer = function (delivererId, delivererFields, next) {
  var f = ff(
    this,
    function () {
      delivererService.updateDelivererById(
        delivererId,
        delivererFields,
        f.slotPlain(2)
      );
    },
    checkAndGetUpdatedDeliverer,
    checkAndReformateCaseOfResult
  ).onComplete(onCompleteHandler);

  function checkAndGetUpdatedDeliverer(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }
    if (myLodash.isEmpty(deliverers)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Deliverer with id: " + delivererId + " is not existed",
      });
    }
    delivererService.getDelivererById(delivererId, f.slotPlain(2));
  }

  function checkAndReformateCaseOfResult(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }
    f.pass(caseReformator(deliverers[0], "SNAKE"));
  }

  function onCompleteHandler(error, updatedDeliverer) {
    if (error) {
      return next(error);
    }
    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: updatedDeliverer,
        message: "Deliverer with id: " + delivererId + " successfully updated!",
      },
    });
  }
};

var deleteDeliverer = function (delivererId, next) {
  var f = ff(
    this,
    function () {
      delivererService.getDelivererById(delivererId, f.slotPlain(2));
    },
    checkAnddeleteDeliverer,
    checkAndReformateCaseOfResult
  ).onComplete(onCompleteHandler);

  function checkAnddeleteDeliverer(error, deliverers) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }
    if (myLodash.isEmpty(deliverers)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Deliverer with id: " + delivererId + " is not existed",
      });
    }
    f.pass(deliverers[0]);
    delivererService.deleteDelivererById(delivererId, f.wait());
  }

  function checkAndReformateCaseOfResult(deletedDeliverer, error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }
    f.pass(caseReformator(deletedDeliverer, "SNAKE"));
  }

  function onCompleteHandler(error, deletedDeliverer) {
    if (error) {
      return next(error);
    }
    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: deletedDeliverer,
        message: "Deliverer with id: " + delivererId + " successfully deleted!",
      },
    });
  }
};

module.exports = {
  getDelivererList: getDelivererList,
  getDelivererById: getDelivererById,
  updateDeliverer: updateDeliverer,
  createDeliverer: createDeliverer,
  deleteDeliverer: deleteDeliverer,
};
