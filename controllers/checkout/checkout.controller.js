var fs = require("fs");
var path = require("path");

var ff = require("ff");

var RESPONSE_CODE = require("./../../enums/responseCodes");
var deepClone = require("./../../helpers/deepClone");

var allNeededFilesPaths = [
  path.resolve(__dirname, "./../../mock/Products.json"),
  path.resolve(
    __dirname,
    "./../../mock/Deliverers.json",
    path.resolve(__dirname, "./../../mock/Users.json")
  ),
];

var makeCheckoutByRandom = function (userId, next) {
  /** TODO:
   * 1) get lists products / deliverers / users (f.group())
   * 2) get user by id (private route) *fail all chain (f.fail())
   * 3) fill checkout info (customer info)
   * 4) get random product
   * 5) get random deliverer
   * 6) if deliverer does not exist --> pass it without error validation (f.slotPlain())
   * 7) if product does not exist --> pass it with error in next func (f.slotPlain(2))
   * 8) make checkout with deliverer & product(if error get first from the list)
   **/

  var f = ff(this, getLists, getUserInfoById).onComplete(onCompleteHandler);

  function getLists() {
    var group = f.group();
    allNeededFilesPaths.forEach(function (file) {
      fs.readFile(file, "utf8", group());
    });
  }

  function getUserInfoById(allFilesContent) {
    console.log(
      allFilesContent.map(function (content, index) {
        return { name: index, data: JSON.parse(content) };
      })
    );
  }

  function onCompleteHandler(error, result) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODE.P_ERROR__NOT_FOUND,
        data: error.message,
      });
    }

    next({
      responseCode: RESPONSE_CODE.SUCCESS__CREATED,
      data: {
        //TODO: change
        data: "nothing",
        message: "Your random checkout",
      },
    });
  }
};

module.exports = {
  makeCheckoutByRandom: makeCheckoutByRandom,
};
