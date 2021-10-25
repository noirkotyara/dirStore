var expressValidation = require("express-validation");
var responseController = require("./../controllers/response.controller");

function requestValidation(err, req, res, next) {
  try {
    if (err instanceof expressValidation.ValidationError) {
      return responseController.sendResponse(
        responseController.RESPONSE_CODE.REQ_VALID_ERROR,
        err,
        res,
        400
      );
    }
    next();
  } catch (error) {
    return responseController.sendResponse(
      "internal error",
      "message",
      res,
      500
    );
  }
}

module.exports = requestValidation;