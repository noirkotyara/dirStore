require("dotenv").config();
// TODO: sort imports by eslint rules
var express = require("express");

var loggerMiddleware = require("./middlewares/logger.middleware");
var responseMiddleware = require("./middlewares/error.middleware");

var userRoutes = require("./routes/user.routes");
var productRoutes = require("./routes/product.routes");
var adminRoutes = require("./routes/admin.routes");

var app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/product", productRoutes);

app.get("/", function (request, response) {
  response.send("<h2>Welcome to the dirStore</h2>");
});

app.use(responseMiddleware.sendResponse);

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
