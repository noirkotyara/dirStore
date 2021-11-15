function requesterTypeMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  req.body["type"] = req.originalUrl.split("/")[1].toUpperCase();
  next();
}

module.exports = requesterTypeMiddleware;
