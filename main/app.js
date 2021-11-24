require("module-alias/register");
require("dotenv").config();
var responseMiddleware = require("message-catcher");
// TODO: sort imports by eslint rules
var express = require("express");
var cors = require("cors");

var testConnectionToDB = require("./helpers/connect-db");

var loggerMiddleware = require("./middlewares/logger.middleware");

var adminRouters = require("./routes/admin");
var userRoutes = require("./routes/user");
var publicRouters = require("./routes/public");

var app = express();

var pool = require("./services/connectors/connect-db-mysql2");

pool.mysqlConnection.connect(function(error) {
  if (error) {
    console.log(
      "MYSQL2 adapter: Connection Failed!" + JSON.stringify(error, undefined, 2)
    );
    return;
  }
  console.log("MYSQL2 adapter: Connection Established Successfully ");
});

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4200"],
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(loggerMiddleware);

app.use("/admin", adminRouters);
app.use("/user", userRoutes);
app.use("/public", publicRouters);

app.get("/", function(request, response) {
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
