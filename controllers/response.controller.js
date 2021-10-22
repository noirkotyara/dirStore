var lodash = require("lodash");

var RESPONSE_CODE = {
  PROCESS_ERROR: "PROCESS_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  BASIC_SUCCESS: "BASIC_SUCCESS",
  SUCCESS: "SUCCESS",
};

function response(responseCode, data, res, status) {
  var dataToSent = {
    timestamp: Date.now(),
    status: status,
  };
  switch (responseCode) {
    case RESPONSE_CODE.PROCESS_ERROR: {
      lodash.merge(dataToSent, {
        message: data,
        errorCode: RESPONSE_CODE.PROCESS_ERROR,
        data: null,
      });
      break;
    }
    case RESPONSE_CODE.BASIC_SUCCESS: {
      lodash.merge(dataToSent, {
        message: data,
        errorCode: null,
        data: null,
      });
      break;
    }
    case RESPONSE_CODE.SUCCESS: {
      lodash.merge(dataToSent, {
        message: data.message,
        errorCode: null,
        data: data.data,
      });
      break;
    }
    default: {
      dataToSent = {
        timestamp: Date.now(),
        message: "Unknown error",
        status: 520,
        errorCode: RESPONSE_CODE.UNKNOWN_ERROR,
        data: null,
      };
      return res.status(520).json(dataToSent);
    }
  }
  return res.status(status).json(dataToSent);
}

module.exports = { sendResponse: response, RESPONSE_CODE: RESPONSE_CODE };
