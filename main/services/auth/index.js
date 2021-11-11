var util = require("util");

var findUserByEmailTS = require("./find-user-by-email");
var findUserByIdTS = require("./find-user-by-id");

var findUserByEmail = util
  .callbackify(findUserByEmailTS.findUserByEmail)
  .bind(findUserByEmailTS);
var findUserById = util
  .callbackify(findUserByIdTS.findUserById)
  .bind(findUserByIdTS);

module.exports = {
  findUserByEmail: function (email, callback) {
    return findUserByEmail(email, callback);
  },
  findUserById: function (userId, callback) {
    return findUserById(userId, callback);
  },
};
