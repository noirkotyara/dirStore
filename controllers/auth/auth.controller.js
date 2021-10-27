var RESPONSE_CODE = require("./../../enums/responseCodes");

var registerController = function (requester, next) {
  next({
    responseCode: RESPONSE_CODE.BASIC_SUCCESS,
    data:
      "Requester with the type: " +
      requester.type +
      " has registered successfully",
    status: 200,
  });
};

var loginController = function (requester, next) {
  next({
    responseCode: RESPONSE_CODE.BASIC_SUCCESS,
    data:
      "Requester with the type: " +
      requester.type +
      " has logged in successfully",
    status: 200,
  });
};

module.exports = {
  register: registerController,
  login: loginController,
};
