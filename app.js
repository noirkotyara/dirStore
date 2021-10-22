var express = require("express");
var app = express();
var userRoutes = require("./routes/user.routes");
var productRoutes = require("./routes/product.routes");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.get("/", function (request, response) {
  response.send("<h2>Welcome to the dirStore</h2>");
});

function start() {
  try {
    console.log("Connection is established successfully on port 3000");
    app.listen(3000);
  } catch (error) {
    console.log("Oops it is a server Error:" + error.message);
    process.exit(1);
  }
}

start();
