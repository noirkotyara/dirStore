function logger(req, res, next) {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  var logger = {
    request: req.method + ": " + fullUrl,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
  };
  console.log("\n---------Logger----------");
  console.log(logger);

  next();
}

module.exports = logger;
