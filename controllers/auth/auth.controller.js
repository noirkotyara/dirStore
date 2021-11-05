var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var bcrypt = require("bcrypt");
var ff = require("ff");
var jwt = require("jsonwebtoken");

var redisClient = require("./../../services/connect-redis");

var myLodash = require("../../helpers/lodash");

var authService = require("../../services/auth.service");

function register(userCredentials, next) {
  var f = ff(this, createUser, checkUserCreate).onComplete(onCompleteHandler);

  function createUser() {
    authService.createUser(userCredentials, f.slotPlain(2));
  }

  function checkUserCreate(error, savedUser) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    var preparedUser = myLodash.omit(savedUser.dataValues, "password");

    f.pass(preparedUser);
  }

  function onCompleteHandler(error, savedUser) {
    if (error) {
      return next(error);
    }

    redisClient.set("userType:" + savedUser.id, savedUser.type);

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: savedUser,
        message:
          userCredentials.type + " is registered " + userCredentials.email,
      },
    });
  }
}

function login(userCredentials, next) {
  var f = ff(
    this,
    function() {
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
    if (!user) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "User is not registered",
      });
    }
    f.pass(user.dataValues);
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

function getUserProfile(userId, next) {
  var TIME_EXPIRES_SEC = 30;

  var f = ff(
    this,
    getUserInfoRedis,
    checkAndGetAlternateFromDB,
    checkAlternateFromDB
  ).onComplete(onCompleteHandler);

  function getUserInfoRedis() {
    redisClient.get("userProfile:" + userId, f.slotPlain(2));
  }

  function checkAndGetAlternateFromDB(error, foundedUser) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }

    if (!myLodash.isEmpty(foundedUser)) {
      return f.succeed(JSON.parse(foundedUser));
    }

    authService.findUserById(userId, f.slotPlain(2));
  }

  function checkAlternateFromDB(error, foundedUserFromDB) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        data: error,
      });
    }

    if (myLodash.isEmpty(foundedUserFromDB)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "User is not founded",
      });
    }

    var preparedUserFromDB = myLodash.deepClone(foundedUserFromDB.dataValues);

    delete preparedUserFromDB.password;

    redisClient.setex(
      "userProfile:" + userId,
      TIME_EXPIRES_SEC,
      JSON.stringify(preparedUserFromDB)
    );

    f.succeed(preparedUserFromDB);
  }

  function onCompleteHandler(error, foundedUser) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: foundedUser,
        message: "User info",
      },
    });
  }
}

module.exports = {
  register: register,
  login: login,
  getUserProfile: getUserProfile,
};
