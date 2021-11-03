var ff = require("ff");
var redis = require("redis");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("./../helpers/lodash");

var authService = require("./../services/auth.service");

var redisClient = redis.createClient();

function checkAccessMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  var allowedRoutes = {
    ADMIN: [
      "PUT:/product/item/:id",
      "POST:/product/item",
      "DELETE:/product/item/:id",
      "PUT:/deliverer/item/:id",
      "POST:/deliverer/item",
      "DELETE:/deliverer/item/:id",
      "POST:/provider/item",
    ],
    USER: ["POST:/checkout/item"],
  };

  var reqInfo = req.method + ":" + req.baseUrl + req.route.path;

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
    console.log("userInfouserInfouserInfo", userInfo.dataValues);

    if (userInfo) {
      return f.succeed(userInfo.dataValues.type);
    }
  }

  function onCompleteHandler(error, requesterType) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }

    if (!allowedRoutes[requesterType].includes(reqInfo)) {
      return next({
        responseCode: RESPONSE_CODES.P_ERROR__FORBIDDEN,
        data: requesterType + " do not have access",
      });
    }
    next();
  }
}

module.exports = checkAccessMiddleware;
