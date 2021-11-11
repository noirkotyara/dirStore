function isEmpty(value) {
  if (!value) return true;

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  if (isArray(value)) {
    return value.length === 0;
  }
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function omit(obj, values) {
  return Object.keys(obj)
    .filter(function (key) {
      return !values.includes(key);
    })
    .reduce(function (acc, k) {
      acc[k] = obj[k];
      return acc;
    }, {});
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isString(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

module.exports = {
  isEmpty: isEmpty,
  deepClone: deepClone,
  isObject: isObject,
  isArray: isArray,
  isString: isString,
  omit: omit,
};
