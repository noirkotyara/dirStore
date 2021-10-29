var myLodash = require("./../helpers/lodash");
var userModel = require("../models/user.model");

function registerUser(preparedCredentials, callback) {
  return userModel
    .create(preparedCredentials)
    .then(function (createdUser) {
      var preparedUser = myLodash.omit(
        createdUser._previousDataValues,
        "password"
      );
      return callback.call(this, null, preparedUser);
    })
    .catch(function (err) {
      return callback.call(this, err, null);
    });
}

function findUserByEmail(email, callback) {
  userModel
    .findOne({ where: { email: email } })
    .then(function (data) {
      return callback.call(this, null, data);
    })
    .catch(function (err) {
      return callback.call(this, err, null);
    });
}

module.exports = {
  registerUser: registerUser,
  findUserByEmail: findUserByEmail,
};
