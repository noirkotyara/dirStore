var ff = require("ff");
var redis = require("redis");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("./../helpers/lodash");

var authService = require("./../services/auth");

var redisClient = redis.createClient();

function checkAccessMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  var routerType = req.originalUrl.split("/")[1].toUpperCase();

  var f = ff(
    this,
    getRequesterTypeRedis,
    checkAndGetAlternateFromDB,
    checkAlternateFromDB
  ).onComplete(onCompleteHandler);

  function getRequesterTypeRedis() {
    redisClient.get("userType:" + req.user.userId, f.slotPlain(2));
  }

  function checkAndGetAlternateFromDB(error, reply) {
    if (error) {
      return f.fail();
    }
    if (!myLodash.isEmpty(reply)) {
      return f.succeed(reply.toString());
    }
    authService.findUserById(req.user.userId, f.slotPlain(2));
  }

  function checkAlternateFromDB(error, userInfo) {
    if (error) {
      return f.fail(error.message);
    }

    if (userInfo) {
      var userType = userInfo.type;

      redisClient.set("userType:" + req.user.userId, userType);

      return f.succeed(userType);
    }
  }

  function onCompleteHandler(error, requesterType) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: error,
      });
    }

    if (routerType !== requesterType) {
      return next({
        responseCode: RESPONSE_CODES.P_ERROR__FORBIDDEN,
        message: requesterType + " do not have access",
      });
    }
    next();
  }
}

module.exports = checkAccessMiddleware;
