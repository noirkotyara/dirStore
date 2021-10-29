require("dotenv").config();
var responseMiddleware = require("message-catcher");
// TODO: sort imports by eslint rules
var express = require("express");
var ff = require("ff");

var loggerMiddleware = require("./middlewares/logger.middleware");

var userRoutes = require("./routes/user.routes");
var productRoutes = require("./routes/product.routes");
var delivererRoutes = require("./routes/deliverer.routes");
var adminRoutes = require("./routes/admin.routes");

var app = express();

var pool = require("./services/connectDB");
var seqConnection = require("./services/connectDBSequelize").seqConnection;

pool.mysqlConnection.connect(function (error) {
  if (error)
    console.log(
      "MYSQL2 adapter: Connection Failed!" + JSON.stringify(error, undefined, 2)
    );
  else console.log("MYSQL2 adapter: Connection Established Successfully ");
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

function testConnectionToDBbySequelize() {
  console.log("SEQUELIZE: Checking database connection...");
  var f = ff(this, tryToConnect).onComplete(onCompleteHandler);

  function tryToConnect() {
    seqConnection.authenticate().then(f.wait());
  }

  function onCompleteHandler(error) {
    if (error) {
      console.log("SEQUELIZE: Unable to connect to the database:", error);
      console.log(error.message);
      return process.exit(1);
    }
    console.log("SEQUELIZE: Database connection OK!");
  }
}

function start() {
  try {
    testConnectionToDBbySequelize();
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
