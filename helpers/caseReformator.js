var myLodash = require("./lodash");

function caseReformator(value, f) {
  var reformatedValue;

  if (myLodash.isObject(value)) {
    reformatedValue = reformator(value);
  }
  if (myLodash.isArray(value)) {
    reformatedValue = value.map(function (item) {
      return reformator(item);
    });
  }
  f.pass(reformatedValue);
}

function reformator(obj) {
  var reformatedObj = {};

  Object.entries(obj).forEach(function (keyValue) {
    var key = keyValue[0];
    var value = keyValue[1];
    var lowerKey = key[0].toLowerCase() + key.slice(1);
    reformatedObj[lowerKey] = value;
  });

  return reformatedObj;
}

module.exports = caseReformator;
