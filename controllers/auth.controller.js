var ff = require("ff");
var fs = require("fs");
var bcrypt = require("bcrypt");
var responseController = require("./response.controller");
var path = require("path");
var uuid = require("uuid");
var lodash = require("lodash");

var usersFilePath = path.resolve(__dirname, "./../mock/Users.json");

var registerController = function (req, res) {
  var userCredentials = req.body;
  var saltRounds = 6;

  function onCompleteHandler(err, userId) {
    if (err) {
      return responseController.sendResponse(
        responseController.RESPONSE_CODE.PROCESS_ERROR,
        err.message,
        res,
        404
      );
    }
    return responseController.sendResponse(
      responseController.RESPONSE_CODE.SUCCESS,
      {
        data: userId,
        message: "User is registered " + userCredentials.email,
      },
      res,
      201
    );
  }

  var f = ff(
    this,
    function hashPassword() {
      return bcrypt.hash(userCredentials.password, saltRounds, f.slot());
    },
    function getUsersList(password) {
      f.pass(password);
      fs.readFile(usersFilePath, "utf8", f.slot());
    },
    function setUser(password, usersList) {
      var updatedUsersList = lodash.cloneDeep(JSON.parse(usersList));
      var userId = uuid.v4();
      var preparedUser = {
        userId: userId,
        email: userCredentials.email,
        password: password,
      };
      updatedUsersList.push(preparedUser);
      fs.writeFile(usersFilePath, JSON.stringify(updatedUsersList), f.wait());
      f.pass(userId);
    }
  ).onComplete(onCompleteHandler);
};

var loginController = function (req, res) {
  return res.status(200).send("Requester with the type: " + req.body.type);
};

module.exports = {
  register: registerController,
  login: loginController,
};
