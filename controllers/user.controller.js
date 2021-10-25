var fs = require("fs");
var lodash = require("lodash");
var ff = require("ff");

function getProfile(req, res) {
  var userId = req.user.userId;

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
    if (error) {
      return responseController.sendResponse(
        responseController.RESPONSE_CODE.PROCESS_ERROR,
        error.message,
        res,
        404
      );
    }
    return responseController.sendResponse(
      responseController.RESPONSE_CODE.SUCCESS,
      {
        data: lodash.omit(foundedUser, "password"),
        message: "User info",
      },
      res,
      201
    );
  }

  var f = ff(this, getUsers, findUser).onComplete(onCompleteHandler);
}

module.exports = { getProfileInfo: getProfile };
