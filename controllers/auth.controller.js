var bcrypt = require("bcrypt");
var ff = require("ff");

var registerController = function() {
  var userCredentials = req.body;

  var hashedPassword = ff(function() {
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.
    });
  }).onComplete(nextFn);


  return "register";
};

var loginController = function(req, res) {
  return "login";
};

module.exports = {
  register: registerController,
  login: loginController,
};
