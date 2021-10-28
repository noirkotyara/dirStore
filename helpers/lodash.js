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

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

module.exports = {
  isEmpty: isEmpty,
  deepClone: deepClone,
  isObject: isObject,
  isArray: isArray,
};
