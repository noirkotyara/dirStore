require("dotenv").config();
var express = require("express");
var app = express();
var userRoutes = require("./routes/user.routes");
var productRoutes = require("./routes/product.routes");
var adminRoutes = require("./routes/admin.routes");
var loggerMiddleware = require("./middlewares/logger.middleware");

app.use(express.json());
app.use(loggerMiddleware);

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
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
