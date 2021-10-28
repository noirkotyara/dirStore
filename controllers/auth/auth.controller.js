var fs = require("fs");
var path = require("path");

var bcrypt = require("bcrypt");
var uuid = require("uuid");
var ff = require("ff");
var jwt = require("jsonwebtoken");

var responseMiddleware = require("message-catcher");
var myLodash = require("../../helpers/lodash");

var usersFilePath = path.resolve(__dirname, "./../../mock/Users.json");

function register(userCredentials, next) {
  var saltRounds = 6;

  var f = ff(this, hashPassword, getUsersList, saveUser).onComplete(
    onCompleteHandler
  );

  function hashPassword() {
    return bcrypt.hash(userCredentials.password, saltRounds, f.slot());
  }

  function getUsersList(password) {
    f.pass(password);
    fs.readFile(usersFilePath, "utf8", f.slot());
  }

  function saveUser(password, usersList) {
    var preparedUser = {};
    var updatedUsersList = myLodash.deepClone(JSON.parse(usersList));
    var userId = uuid.v4();

    Object.assign(preparedUser, userCredentials, {
      userId: userId,
      password: password,
    });
    updatedUsersList.push(preparedUser);
    fs.writeFile(usersFilePath, JSON.stringify(updatedUsersList), f.wait());
    f.pass(userId);
  }

  function onCompleteHandler(err, userId) {
    if (err) {
      return next({
        responseCode: RESPONSE_CODE.P_ERROR__NOT_FOUND,
        data: err.message,
      });
    }

    next({
      responseCode: RESPONSE_CODE.SUCCESS__CREATED,
      data: {
        data: userId,
        message: "User is registered " + userCredentials.email,
      },
    });
  }
}

function login(userCredentials, next) {
  var f = ff(
    this,
    getUserByEmail,
    comparePassword,
    checkIsValid,
    createToken
  ).onComplete(onCompleteHandler);

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
    if (objHelpers.isEmpty(user))
      return f.fail("Email or Password are incorrect");

    bcrypt.compare(userCredentials.password, user.password, f.slot());
  }

  function checkIsValid(user, isValid) {
    return isValid ? f.pass(user) : f.fail("Email or Password are incorrect");
  }

  function createToken(user) {
    var userWithToken = {};

    var token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
      },
      process.env.JWT_S,
      {
        expiresIn: "1h",
      }
    );
    Object.assign(userWithToken, user, { token: token });
    delete userWithToken.password;
    f.pass(userWithToken);
  }

  function onCompleteHandler(error, userInSystem) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODE.P_ERROR__NOT_FOUND,
        data: error.message,
      });
    }

    next({
      responseCode: RESPONSE_CODE.SUCCESS__CREATED,
      data: {
        data: userInSystem,
        message: "Login is successful for " + userCredentials.email,
      }
    });
  }
}


module.exports = {
  register: register,
  login: login,
};
