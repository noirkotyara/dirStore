var util = require("util");

var userModel = require("../models/user.model");
var identifierModel = require("../models/identifier.model");

function createUser(preparedCredentials, callback) {
  var c = util.callbackify(function () {
    return userModel.create(preparedCredentials, {
      include: {
        model: identifierModel,
        as: "identifier",
      },
    });
  });
  return c(callback);
}

function saveUser(user, callback) {
  var c = util.callbackify(function () {
    return user.save();
  });
  return c(callback);
}

function findUserById(userId, callback) {
  var c = util.callbackify(function () {
    return userModel.findOne({ where: { id: userId } });
  });
  return c(callback);
}

function findUserByEmail(email, callback) {
  var c = util.callbackify(function () {
    return userModel.findOne({ where: { email: email } });
  });
  return c(callback);
}

module.exports = {
  createUser: createUser,
  findUserByEmail: findUserByEmail,
};
