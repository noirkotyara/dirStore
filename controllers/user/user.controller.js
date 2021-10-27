var ff = require("ff");
var fs = require("fs");
var path = require("path");

var RESPONSE_CODE = require("./../../enums/responseCodes");

var deepClone = require("./../../helpers/deepClone");

var usersFilePath = path.resolve(__dirname, "./../../mock/Users.json");

function getUserProfile(userId, next) {
  var f = ff(this, getUsers, findUser).onComplete(onCompleteHandler);

  function getUsers() {
    fs.readFile(usersFilePath, "utf8", f.slot());
  }

  function findUser(data) {
    var usersList = JSON.parse(data);
    var foundedUser = usersList.find(function (currentUser) {
      return currentUser.userId === userId;
    });
    f.pass(foundedUser);
  }

  function onCompleteHandler(error, foundedUser) {
    var userInfo = deepClone(foundedUser);

    if (error) {
      return next({
        responseCode: RESPONSE_CODE.P_ERROR__NOT_FOUND,
        data: error.message,
      });
    }

    delete userInfo.password;

    next({
      responseCode: RESPONSE_CODE.SUCCESS__CREATED,
      data: {
        data: userInfo,
        message: "User info",
      },
    });
  }
}

module.exports = { getUserProfile: getUserProfile };
