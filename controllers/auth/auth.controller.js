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

  var f = ff(this, hashPassword, checkAndSaveUser, checkUserSaving).onComplete(
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

    authService.registerUser(preparedUserCredentials, f.slotPlain(2));
  }

  function checkUserSaving(error, savedUser) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    f.pass(savedUser);
  }

  function onCompleteHandler(error, savedUser) {
    if (error) {
      return next(error);
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
    function () {
      authService.findUserByEmail(userCredentials.email, f.slotPlain(2));
    },
    comparePassword,
    checkIsValid,
    createToken
  ).onComplete(onCompleteHandler);

  function comparePassword(error, user) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    f.pass(user);
    bcrypt.compare(userCredentials.password, user.password, f.slot());
  }

  function checkIsValid(user, isValid) {
    if (!isValid) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__FORBIDDEN,
        data: "Email or Password are incorrect",
      });
    }
    f.pass(user);
  }

  function createToken(user) {
    try {
      var userWithToken = myLodash.omit(user, "password");

      userWithToken.token = jwt.sign(
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

      f.pass(userWithToken);
    } catch (error) {
      f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: "Cannot create token",
      });
    }
  }

  function onCompleteHandler(error, userInSystem) {
    if (error) {
      return next(error);
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
