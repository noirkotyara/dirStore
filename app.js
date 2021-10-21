const express = require("express");

const app = express();

app.get("/", function (request, response) {
  response.send("<h2>Hello Express</h2>");
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
