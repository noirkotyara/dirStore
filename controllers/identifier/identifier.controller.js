var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

function createIdentifier(userId, identifierInfo, next) {
  var f = ff(this, createIdentifierItem, checkIdentifierCreate).onComplete(
    onCompleteHandler
  );

  function createIdentifierItem() {
    //identifier service
  }

  function checkIdentifierCreate(error, savedIdentifier) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
  }

  function onCompleteHandler(error, savedIdentifier) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: savedIdentifier,
        message: "Identifier is created " + savedIdentifier.id,
      },
    });
  }
}

module.exports = { createIdentifier: createIdentifier };
