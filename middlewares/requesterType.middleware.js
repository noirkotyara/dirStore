var RequesterType = Object.freeze({
  ADMIN: "ADMIN",
  USER: "USER",
});

function requesterType(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  switch (req.originalUrl.split("/")[1]) {
    case "admin":
      req.body["type"] = RequesterType.ADMIN;
      break;
    case "user":
      req.body["type"] = RequesterType.USER;
      break;
    default:
      break;
  }

  next();
}

module.exports = requesterType;
