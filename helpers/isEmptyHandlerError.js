var lodash = require("lodash");
var responseController = require("./../controllers/response.controller");

function isEmptyHandlerError(itemToCheck, res) {
  if (lodash.isEmpty(itemToCheck))
    return responseController.sendResponse(
      responseController.RESPONSE_CODE.PROCESS_ERROR,
      "Id is not existed",
      res,
      404
    );
}

module.exports = isEmptyHandlerError;
