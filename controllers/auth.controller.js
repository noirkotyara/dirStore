var ff = require("ff");
var fs = require("fs");
var bcrypt = require("bcrypt");
var path = require("path");
var uuid = require("uuid");
var lodash = require("lodash");
var jwt = require("jsonwebtoken");
var responseController = require("response-controller");

var usersFilePath = path.resolve(__dirname, "./../mock/Users.json");

var registerController = function (req, res) {
  var userCredentials = req.body;
  var saltRounds = 6;

  function hashPassword() {
    return bcrypt.hash(userCredentials.password, saltRounds, f.slot());
  }

  function getUsersList(password) {
    f.pass(password);
    fs.readFile(usersFilePath, "utf8", f.slot());
  }

  function saveUser(password, usersList) {
    var updatedUsersList = lodash.cloneDeep(JSON.parse(usersList));
    var userId = uuid.v4();
    var preparedUser = lodash.merge({}, userCredentials, {
      userId: userId,
      password: password,
    });
    updatedUsersList.push(preparedUser);
    fs.writeFile(usersFilePath, JSON.stringify(updatedUsersList), f.wait());
    f.pass(userId);
  }

  function onCompleteHandler(err, userId) {
    if (err) {
      return responseController.sendResponse(
        responseController.RESPONSE_CODES.PROCESS_ERROR,
        err.message,
        res,
        404
      );
    }
    return responseController.sendResponse(
      responseController.RESPONSE_CODES.SUCCESS,
      {
        data: userId,
        message: "User is registered " + userCredentials.email,
      },
      res,
      201
    );
  }

  var f = ff(this, hashPassword, getUsersList, saveUser).onComplete(
    onCompleteHandler
  );
};

var loginController = function (req, res) {
  var userCredentials = req.body;

  function getUserByEmail() {
    try {
      var data = fs.readFileSync(usersFilePath, "utf8");
      var usersList = JSON.parse(data);
      var foundedUser = usersList.find(function (currentUser) {
        return currentUser.email === userCredentials.email;
      });
      f.pass(foundedUser);
    } catch (e) {
      return f.fail(e.message);
    }
  }

  function comparePassword(user) {
    f.pass(user);
    if (lodash.isEmpty(user)) return f.fail("Email or Password are incorrect");

    bcrypt.compare(userCredentials.password, user.password, f.slot());
  }

  function checkIsValid(user, isValid) {
    return isValid ? f.pass(user) : f.fail("Email or Password are incorrect");
  }

  function createToken(user) {
    var token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
      },
      process.env.JWT_S,
      {
        expiresIn: "60000ms",
      }
    );
    var userWithToken = lodash.merge({}, user, { token: token });
    f.pass(userWithToken);
  }

  function onCompleteHandler(err, user) {
    if (err) {
      return responseController.sendResponse(
        responseController.RESPONSE_CODES.PROCESS_ERROR,
        err,
        res,
        404
      );
    }
    return responseController.sendResponse(
      responseController.RESPONSE_CODES.SUCCESS,
      {
        data: lodash.omit(user, "password"),
        message: "Login is successful for " + user.email,
      },
      res,
      201
    );
  }

  var f = ff(
    this,
    getUserByEmail,
    comparePassword,
    checkIsValid,
    createToken
  ).onComplete(onCompleteHandler);
};

module.exports = {
  register: registerController,
  login: loginController,
};
