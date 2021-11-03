var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var REQUESTER_TYPE = require("../enums/requester-type");

function requesterTypeMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  var requesterType = req.params.type.toUpperCase();

  if (![REQUESTER_TYPE.USER, REQUESTER_TYPE.ADMIN].includes(requesterType)) {
    return next({
      responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
      data: "Requester type is invalid",
    });
  }

  req.body["type"] = requesterType;
  next();
}

module.exports = requesterTypeMiddleware;
