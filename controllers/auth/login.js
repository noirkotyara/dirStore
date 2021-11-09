var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var bcrypt = require("bcrypt");
var ff = require("ff");
var jwt = require("jsonwebtoken");

var myLodash = require("../../helpers/lodash");

var authService = require("../../services/auth");

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
        message: error,
      });
    }
    if (!user) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "User is not registered",
      });
    }

    f.pass(user);
    bcrypt.compare(userCredentials.password, user.password, f.slot());
  }

  function checkIsValid(user, isValid) {
    if (!isValid) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__FORBIDDEN,
        message: "Email or Password are incorrect",
      });
    }
    f.pass(user);
  }

  function createToken(user) {
    try {
      var userWithToken = myLodash.omit(user, "password");

      userWithToken.token = jwt.sign(
        {
          userId: user.id,
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

module.exports = login;
