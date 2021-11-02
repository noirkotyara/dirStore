require("dotenv").config();
var responseMiddleware = require("message-catcher");
// TODO: sort imports by eslint rules
var express = require("express");

var testConnectionToDB = require("./helpers/connectDB");

var loggerMiddleware = require("./middlewares/logger.middleware");

var userRoutes = require("./routes/user.routes");
var productRoutes = require("./routes/product.routes");
var delivererRoutes = require("./routes/deliverer.routes");
var adminRoutes = require("./routes/admin.routes");

var app = express();

var pool = require("./services/connectDB");

pool.mysqlConnection.connect(function (error) {
  if (error) {
    return console.log(
      "MYSQL2 adapter: Connection Failed!" + JSON.stringify(error, undefined, 2)
    );
  }
  console.log("MYSQL2 adapter: Connection Established Successfully ");
});

app.use(express.json());
app.use(loggerMiddleware);

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/product", productRoutes);
app.use("/deliverer", delivererRoutes);

app.get("/", function (request, response) {
  response.send("<h2>Welcome to the dirStore</h2>");
});

app.use(responseMiddleware.sendResponse);

function start() {
  try {
    testConnectionToDB.testConnectionToDBsequelize();
    testConnectionToDB.testConnectionToDBknex();
    console.log(
      "SERVER: Connection is established successfully on port " +
        process.env.PORT
    );
    app.listen(process.env.PORT);
  } catch (error) {
    console.log("SERVER: Oops it is a server Error:" + error.message);
    process.exit(1);
  }
}

start();
