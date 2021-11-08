var getUserProfile = require("./getUserProfile");
var login = require("./login");
var register = require("./register").register;
var updateUserProfile = require("./updateUserProfile").updateUserProfile;
var deleteUserProfile = require("./deleteUserProfile").deleteUserProfile;

module.exports = {
  getUserProfile: getUserProfile,
  login: login,
  register: register,
  updateUserProfile: updateUserProfile,
  deleteUserProfile: deleteUserProfile,
};
