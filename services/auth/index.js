var util = require("util");

var findUserByEmailTS = require("./findUserByEmail");
var findUserByIdTS = require("./findUserById");

var findUserByEmail = util.callbackify(findUserByEmailTS);
var findUserById = util.callbackify(findUserByIdTS);

module.exports = {
  findUserByEmail: function (email, callback) {
    return findUserByEmail(email, callback);
  },
  findUserById: function (userId, callback) {
    return findUserById(userId, callback);
  },
};
