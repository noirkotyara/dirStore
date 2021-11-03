var ff = require("ff");
var redis = require("redis");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

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

  var f = ff(this, getRequesterType).onComplete(checkAndGetAccess);

  function getRequesterType() {
    redisClient.get(req.user.userId, f.slot());
  }

  function checkAndGetAccess(error, reply) {
    var requesterType = reply.toString();

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
