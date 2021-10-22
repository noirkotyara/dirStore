require("dotenv").config();
var express = require("express");
var app = express();
var userRoutes = require("./routes/user.routes");
var productRoutes = require("./routes/product.routes");
var bodyParser = require("body-parser");

app.use(express.json());

app.use(function (req, res, next) {
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
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.get("/", function (request, response) {
  response.send("<h2>Welcome to the dirStore</h2>");
});

function start() {
  try {
    console.log(
      "Connection is established successfully on port " + process.env.PORT
    );
    app.listen(process.env.PORT);
  } catch (error) {
    console.log("Oops it is a server Error:" + error.message);
    process.exit(1);
  }
}

start();
