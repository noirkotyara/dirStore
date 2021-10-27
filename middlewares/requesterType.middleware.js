var REQUESTER_TYPE = require("./../enums/requesterType");

function requesterType(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  switch (req.originalUrl.split("/")[1]) {
    case "admin":
      req.body["type"] = REQUESTER_TYPE.ADMIN;
      break;
    case "user":
      req.body["type"] = REQUESTER_TYPE.USER;
      break;
    default:
      break;
  }

  next();
}

module.exports = requesterType;
