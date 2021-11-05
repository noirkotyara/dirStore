var fs = require("fs");

var ff = require("ff");

function getRandomItem(filePath, alternateList, callback) {
  var f = ff(this, getItemsList, getItem).onSuccess(onSuccessHandler);

  function getItemsList() {
    fs.readFile(filePath, "utf8", f.slotPlain(2));
  }

  function getItem(error, itemsList) {
    var items = error ? alternateList : JSON.parse(itemsList);

    var item = items[Math.floor(Math.random() * items.length)];
    f.pass(item);
  }

  function onSuccessHandler(deliverer) {
    callback.call(this, deliverer);
  }
}

module.exports = getRandomItem;
