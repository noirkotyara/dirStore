var ff = require("ff");
var fs = require("fs");
var path = require("path");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");

var brokenUsersFilePath = path.resolve(
  __dirname,
  "./../5656665../mock/Users.json"
);

var usersFilePath = path.resolve(__dirname, "./../../mock/Users.json");

function getUserProfile(userId, next) {
  var f = ff(this, getUsers, checkUsersList, findUser).onComplete(
    onCompleteHandler
  );

  function getUsers() {
    // f.slotPlain for throwing error and other result arguments in the chain of function
    fs.readFile(brokenUsersFilePath, "utf8", f.slotPlain(2));
  }

  function checkUsersList(error, data) {
    if (error) {
      return fs.readFile(usersFilePath, "utf8", f.slot());
    }
    f.pass(data);
  }

  function findUser(data) {
    var usersList = JSON.parse(data);
    var foundedUser = usersList.find(function (currentUser) {
      return currentUser.userId === userId;
    });

    if (myLodash.isEmpty(foundedUser)) {
      f.fail({ message: "User is not founded" });
    }
    f.pass(foundedUser);
  }

  function onCompleteHandler(error, foundedUser) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: error.message,
      });
    }

    var userInfo = myLodash.deepClone(foundedUser);

    delete userInfo.password;

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: userInfo,
        message: "User info",
      },
    });
  }
}

module.exports = { getUserProfile: getUserProfile };
