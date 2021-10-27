var responseMiddleware = require("message-catcher");

var objHelpers = require("./../../../helpers/objectHelpers");

function isEmptySendError(itemId, itemToCheck, next) {
  if (objHelpers.isEmpty(itemToCheck))
    return next({
      responseCode: responseMiddleware.RESPONSE_CODES.PROCESS_ERROR,
      data: "Product with id: " + itemId + " is not existed",
      status: 404,
    });
}

module.exports = isEmptySendError;
