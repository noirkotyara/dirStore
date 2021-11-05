var getUserProfile = require("./getUserProfile");
var login = require("./login");
var register = require("./register").register;
var updateUserProfile = require("./updateUserProfile").updateUserProfile;

module.exports = {
  getUserProfile: getUserProfile,
  login: login,
  register: register,
  updateUserProfile: updateUserProfile,
};
