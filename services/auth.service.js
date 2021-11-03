var util = require("util");

var userModel = require("../models/user.model");
var identifierModel = require("../models/identifier.model");

var findUserByIdCallback = util.callbackify(userModel.findOne).bind(userModel);
var createUserCallback = util.callbackify(userModel.create).bind(userModel);
var findUserByEmailCallback = util
  .callbackify(userModel.findOne)
  .bind(userModel);

function createUser(preparedCredentials, callback) {
  return createUserCallback(
    preparedCredentials,
    {
      include: {
        model: identifierModel,
        as: "identifier",
      },
    },
    callback
  );
}

function findUserById(userId, callback) {
  return findUserByIdCallback(
    {
      where: { id: userId },
      include: {
        model: identifierModel,
        as: "identifier",
      },
    },
    callback
  );
}

function findUserByEmail(email, callback) {
  return findUserByEmailCallback(
    {
      where: { email: email },
      include: {
        model: identifierModel,
        as: "identifier",
      },
    },
    callback
  );
}

module.exports = {
  createUser: createUser,
  findUserByEmail: findUserByEmail,
  findUserById: findUserById,
};
