var ff = require("ff");
var util = require("util");

var myLodash = require("./../helpers/lodash");
var userModel = require("../models/user.model");

function registerUser(preparedCredentials, callback) {
  // var f = ff(
  //   this,
  //   function () {
  //     _createUser(preparedCredentials, f.slotPlain(2));
  //   },
  //   function (error, createdUser) {
  //     _saveUser(createdUser, f.slotPlain(1));
  //     f.slot(createdUser.id);
  //   },
  //   function (error) {}
  // );

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

// function _createUser(preparedCredentials) {
//   return util.callbackify(function () {
//     userModel.create(preparedCredentials);
//   });
// }
//
// function _saveUser(user) {
//   return util.callbackify(function () {
//     user.save();
//   });
// }

function findUserByEmail(email, callback) {
  userModel
    .findOne({ where: { email: email } })
    .then(function (foundedUser) {
      return callback.call(this, null, foundedUser._previousDataValues);
    })
    .catch(function (err) {
      return callback.call(this, err, null);
    });
}

module.exports = {
  registerUser: registerUser,
  findUserByEmail: findUserByEmail,
};
