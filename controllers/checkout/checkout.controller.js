var fs = require("fs");
var path = require("path");

var uuid = require("uuid");
var ff = require("ff");
var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");
var getRandomItem = require("./helpers/getRandomItem");

var deliverersFilePath = path.resolve(
  __dirname,
  "./../../mock/Deliverers.json"
);
var brokenProductsFilePath = path.resolve(
  __dirname,
  "./../..67667/mock/Products.json"
);
var checkoutsFilePath = path.resolve(__dirname, "./../../mock/Checkouts.json");
var allNeededFilesPaths = [
  path.resolve(__dirname, "./../../mock/Products.json"),
  deliverersFilePath,
  path.resolve(__dirname, "./../../mock/Users.json"),
];

var makeCheckoutByRandom = function (userId, next) {
  /**
   * 1) get lists products / deliverers / users (f.group()) +
   * 2) get user by id (private route) *fail all chain (f.fail()) +
   * 3) fill checkout info (customer info) +
   * 4) get random product / deliverer (f.slotPlain()) +
   * 5) make checkout with deliverer & product +
   * 6) form and save checkout in file +
   **/

  var f = ff(
    this,
    getLists,
    splitContentOfLists,
    setUserInfoInCheckout,
    setRandomProductAndDeliverer,
    formCheckout,
    getCheckoutList,
    saveCheckout
  ).onComplete(onCompleteHandler);

  function getLists() {
    var group = f.group();
    allNeededFilesPaths.forEach(function (file) {
      fs.readFile(file, "utf8", group());
    });
  }

  function splitContentOfLists(allFilesContent) {
    var filesContent = {};
    filesContent.products = JSON.parse(allFilesContent[0]);
    filesContent.deliverers = JSON.parse(allFilesContent[1]);
    filesContent.users = JSON.parse(allFilesContent[2]);
    f.pass(filesContent);
  }

  function setUserInfoInCheckout(filesContent) {
    f.pass(filesContent);
    var checkout = {};

    var usersList = filesContent.users;
    var foundedUser = usersList.find(function (currentUser) {
      return currentUser.userId === userId;
    });

    if (myLodash.isEmpty(foundedUser)) {
      return f.fail({ message: "User is not founded" });
    }

    var customer = {};

    customer.fullName = foundedUser.firstName + " " + foundedUser.lastName;
    customer.email = foundedUser.email;

    checkout.customer = customer;

    f.pass(checkout);
  }

  function setRandomProductAndDeliverer(filesContent, checkout) {
    f.pass(checkout);
    getRandomItem(brokenProductsFilePath, filesContent.products, f.slotPlain());
    getRandomItem(deliverersFilePath, filesContent.deliverers, f.slotPlain());
  }

  function formCheckout(checkout, product, deliverer) {
    var formedCheckout = myLodash.deepClone(checkout);

    formedCheckout.checkoutId = uuid.v4();
    formedCheckout.productId = product.productId;
    formedCheckout.delivererId = deliverer.delivererId;

    f.pass(formedCheckout);
  }

  function getCheckoutList(formedCheckout) {
    f.pass(formedCheckout);
    fs.readFile(checkoutsFilePath, "utf8", f.slot());
  }

  function saveCheckout(formedCheckout, checkoutsList) {
    var checkouts = JSON.parse(checkoutsList);

    checkouts.push(formedCheckout);

    fs.writeFile(
      checkoutsFilePath,
      JSON.stringify(checkouts),
      "utf8",
      f.wait()
    );
    f.pass(formedCheckout);
  }

  function onCompleteHandler(error, savedCheckout) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: error.message,
      });
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: savedCheckout,
        message: "Your random checkout is generated",
      },
    });
  }
};

module.exports = {
  makeCheckoutByRandom: makeCheckoutByRandom,
};
