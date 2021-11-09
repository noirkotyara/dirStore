var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var ff = require("ff");

var redisClient =
  require("../../services/connectors/connect-redis").redisClient;

var myLodash = require("../../helpers/lodash");

var authService = require("../../services/auth");

function getUserProfile(userId, next) {
  var f = ff(
    this,
    getUserInfoRedis,
    checkAndGetAlternateFromDB,
    checkAlternateFromDB
  ).onComplete(onCompleteHandler);

  function getUserInfoRedis() {
    redisClient.get("userProfile:" + userId, f.slotPlain(2));
  }

  function checkAndGetAlternateFromDB(error, foundedUser) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }

    if (!myLodash.isEmpty(foundedUser)) {
      return f.succeed(JSON.parse(foundedUser));
    }

    authService.findUserById(userId, f.slotPlain(2));
  }

  function checkAlternateFromDB(error, foundedUserFromDB) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }

    if (myLodash.isEmpty(foundedUserFromDB)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "User is not founded",
      });
    }

    var preparedUserFromDB = myLodash.deepClone(foundedUserFromDB.get());

    delete preparedUserFromDB.password;

    redisClient.setex(
      "userProfile:" + userId,
      30,
      JSON.stringify(preparedUserFromDB)
    );

    f.succeed(preparedUserFromDB);
  }

  function onCompleteHandler(error, foundedUser) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: foundedUser,
        message: "User info",
      },
    });
  }
}

module.exports = getUserProfile;
