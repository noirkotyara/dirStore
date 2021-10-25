var lodash = require("lodash");
var responseController = require("response-controller");

function isEmptyHandlerError(itemToCheck, res) {
  if (lodash.isEmpty(itemToCheck))
    return responseController.sendResponse(
      responseController.RESPONSE_CODES.PROCESS_ERROR,
      "Id is not existed",
      res,
      404
    );
}

module.exports = isEmptyHandlerError;
