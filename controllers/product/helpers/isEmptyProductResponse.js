var objHelpers = require("./../../../helpers/objectHelpers");
var RESPONSE_CODE = require("./../../../enums/responseCodes");

function isEmptySendError(itemId, itemToCheck, next) {
  if (objHelpers.isEmpty(itemToCheck))
    return next({
      responseCode: RESPONSE_CODE.PROCESS_ERROR,
      data: "Product with id: " + itemId + " is not existed",
      status: 404,
    });
}

module.exports = isEmptySendError;
