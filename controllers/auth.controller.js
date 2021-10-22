var registerController = function () {
  return "register";
};

var loginController = function (req, res) {
  return res.status(200).send("Requester with the type: " + req.body.type);
};

module.exports = {
  register: registerController,
  login: loginController,
};
