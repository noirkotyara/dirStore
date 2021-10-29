var ff = require("ff");

var myLodash = require("./lodash");

var CASE_FORMATS = require("./../enums/formatCase");

/** helps reformat snake_case in lowerCamelCase
 * arg[1]: caseFormat: SNAKE | LOWER_CAMEL**/

function caseReformator(value, caseFormat) {
  var reformatedValue;

  var reformatorByCase =
    caseFormat === CASE_FORMATS.SNAKE ? snakeToCamelCase : camelToSnakeCase;

  if (myLodash.isObject(value)) {
    reformatedValue = reformatorByCase(value);
  }
  if (myLodash.isArray(value)) {
    reformatedValue = value.map(function (item) {
      return reformatorByCase(item);
    });
  }

  return reformatedValue;
}

function camelToSnakeCase(obj) {
  var reformatedObj = {};

  Object.entries(obj).forEach(function (keyValue) {
    var key = keyValue[0];
    var value = keyValue[1];
    var snakeFormat = key.replace(/[A-Z]/g, function (letter) {
      return "_" + letter.toLowerCase();
    });
    reformatedObj[snakeFormat] = value;
  });

  return reformatedObj;
}

function snakeToCamelCase(obj) {
  var reformatedObj = {};

  Object.entries(obj).forEach(function (keyValue) {
    var key = keyValue[0];
    var value = keyValue[1];
    var snakeFormat = key
      .split("_")
      .map(function (subStr, index) {
        var isFirst = index === 0;

        return isFirst
          ? subStr.toLowerCase()
          : subStr[0].toUpperCase() + subStr.slice(1).toLowerCase();
      })
      .join("");
    reformatedObj[snakeFormat] = value;
  });

  return reformatedObj;
}

module.exports = caseReformator;
