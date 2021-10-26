// TODO: remove isEmptyHandlerError
var objHelpers = require("./objectHelpers");

var responseController = require("./../controllers/response.controller");

function isEmptyHandlerError(itemToCheck, res) {
  if (objHelpers.isEmpty(itemToCheck))
    return responseController.sendResponse(
      responseController.RESPONSE_CODE.PROCESS_ERROR,
      "Id is not existed",
      res,
      404
    );
}

module.exports = isEmptyHandlerError;
