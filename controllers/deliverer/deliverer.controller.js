var fs = require("fs");
var path = require("path");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var readAndWriteFileSync = require("./../../helpers/readAndWriteFileSync");
var myLodash = require("../../helpers/lodash");

var saveDeliverer = require("./helpers/saveDeliverer");

var deliverersFilePath = path.resolve(
  __dirname,
  "./../../mock/Deliverers.json"
);

var createDeliverer = function (delivererInfo, next) {
  try {
    var newDeliverer = delivererInfo;

    readAndWriteFileSync(deliverersFilePath, saveDeliverer, delivererInfo);

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: newDeliverer,
        message: "Deliverer is created successfully!",
      },
    });
  } catch (error) {
    next({
      responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
      data: error.message,
    });
  }
};

var getDelivererList = function (next) {
  var stream = fs.createReadStream(deliverersFilePath, "utf8");

  stream.on("data", function (data) {
    var deliverersList = JSON.parse(data);
    return next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: { data: deliverersList, message: "List of deliverers" },
    });
  });

  stream.on("error", function () {
    next({
      responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
      data: "Cannot read the file with the list of deliverers",
    });
  });
};

var getDelivererById = function (delivererId, next) {
  if (!delivererId)
    return next({
      responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
      data: "Deliverer id is missing",
    });

  var data = fs.readFileSync(deliverersFilePath, "utf8");

  var productsList = JSON.parse(data);

  var foundedDeliverer = productsList.find(function (item) {
    return item.delivererId === delivererId;
  });

  if (myLodash.isEmpty(foundedDeliverer))
    return next({
      responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
      data: "Deliverer with id: " + delivererId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODES.SUCCESS,
    data: {
      data: foundedDeliverer,
      message: "Deliverer info with id: " + delivererId,
    },
  });
};

var updateDeliverer = function (delivererId, delivererFields, next) {
  var preparedDeliverer = {};

  var updateDeliverer = function (productsList) {
    return productsList.map(function (item) {
      if (item.delivererId === delivererId) {
        Object.assign(preparedDeliverer, item, delivererFields);
        return preparedDeliverer;
      }
      return item;
    });
  };

  readAndWriteFileSync(deliverersFilePath, updateDeliverer);

  if (myLodash.isEmpty(preparedDeliverer))
    return next({
      responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
      data: "Deliverer with id: " + delivererId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODES.SUCCESS,
    data: {
      data: preparedDeliverer,
      message: "Deliverer is successfully updated",
    },
  });
};

var deleteDeliverer = function (delivererId, next) {
  var deletedDeliverer = {};

  var deleteDeliverer = function (delivererList) {
    return delivererList.filter(function (currentDeliverer) {
      var isDeletedDeliverer = currentDeliverer.delivererId === delivererId;
      if (isDeletedDeliverer) {
        deletedDeliverer = currentDeliverer;
      }
      return !isDeletedDeliverer;
    });
  };

  readAndWriteFileSync(deliverersFilePath, deleteDeliverer);

  if (myLodash.isEmpty(deletedDeliverer))
    return next({
      responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
      data: "Deliverer with id: " + delivererId + " is not existed",
    });

  next({
    responseCode: RESPONSE_CODES.SUCCESS,
    data: {
      data: deletedDeliverer,
      message: "Deliverer is successfully deleted",
    },
  });
};

module.exports = {
  getDelivererList: getDelivererList,
  getDelivererById: getDelivererById,
  updateDeliverer: updateDeliverer,
  createDeliverer: createDeliverer,
  deleteDeliverer: deleteDeliverer,
};
