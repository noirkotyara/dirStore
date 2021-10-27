var expressValidation = require("express-validation");

var RESPONSE_CODE = require("./../enums/responseCodes");

function responseHandler(error, req, res, next) {
  try {
    var dataToSent = {
      timestamp: Date.now(),
      status: error.status,
    };

    if (error instanceof expressValidation.ValidationError) {
      var createdMessage = error.details.body
        .map(function (bodyData) {
          return bodyData.message;
        })
        .join("/n");

      Object.assign(dataToSent, {
        status: 400,
        statusCode: RESPONSE_CODE.REQ_VALID_ERROR,
        message: createdMessage,
        data: null,
      });
    }

    switch (error.responseCode) {
      case RESPONSE_CODE.PROCESS_ERROR: {
        Object.assign(dataToSent, {
          message: error.data,
          errorCode: RESPONSE_CODE.PROCESS_ERROR,
          data: null,
        });
        break;
      }
      case RESPONSE_CODE.BASIC_SUCCESS: {
        Object.assign(dataToSent, {
          message: error.data,
          errorCode: null,
          data: null,
        });
        break;
      }
      case RESPONSE_CODE.SUCCESS: {
        Object.assign(dataToSent, {
          message: error.data.message,
          errorCode: null,
          data: error.data.data,
        });
        break;
      }
    }
    return res.status(dataToSent.status).json(dataToSent);
  } catch (e) {
    console.log("RESPONSE_HANDLER_CATCH", e);
  }
}

module.exports = {
  sendResponse: responseHandler,
};
