var fs = require("fs");
var path = require("path");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var bcrypt = require("bcrypt");
var ff = require("ff");
var jwt = require("jsonwebtoken");

var myLodash = require("../../helpers/lodash");

var authService = require("../../services/auth.service");

var usersFilePath = path.resolve(__dirname, "./../../mock/Users.json");

function register(userCredentials, next) {
  var saltRounds = 6;

  var f = ff(this, hashPassword, checkAndSaveUser).onComplete(
    onCompleteHandler
  );

  function hashPassword() {
    return bcrypt.hash(userCredentials.password, saltRounds, f.slotPlain(2));
  }

  function checkAndSaveUser(error, hashedPassword) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: "It is not possible to hash password",
      });
    }
    var preparedUserCredentials = myLodash.deepClone(userCredentials);

    preparedUserCredentials["password"] = hashedPassword;

    authService.registerUser(preparedUserCredentials, f.slot());
  }

  function onCompleteHandler(err, savedUser) {
    if (err) {
      return next({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: err,
      });
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: savedUser,
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
    if (myLodash.isEmpty(user))
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
        type: user.type,
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
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: error.message,
      });
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: userInSystem,
        message: "Login is successful for " + userCredentials.email,
      },
    });
  }
}

module.exports = {
  register: register,
  login: login,
};
