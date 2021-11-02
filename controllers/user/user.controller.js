var ff = require("ff");

var authService = require("./../../services/auth.service");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");

function getUserProfile(userId, next) {
  var f = ff(this, getUser, checkUser).onComplete(onCompleteHandler);

  function getUser() {
    authService.findUserById(userId, f.slotPlain(2));
  }

  function checkUser(error, foundedUser) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }

    if (myLodash.isEmpty(foundedUser)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "User is not founded",
      });
    }

    f.pass(foundedUser);
  }

  function onCompleteHandler(error, foundedUser) {
    if (error) {
      return next(error);
    }

    var userInfo = myLodash.deepClone(foundedUser);

    delete userInfo.password;

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: userInfo,
        message: "User info",
      },
    });
  }
}

module.exports = { getUserProfile: getUserProfile };
