var getUserProfile = require("./getUserProfile");
var login = require("./login");
var register = require("./register").register;

module.exports = {
  getUserProfile: getUserProfile,
  login: login,
  register: register,
};
