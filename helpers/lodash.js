function isEmpty(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = { isEmpty: isEmpty, deepClone: deepClone };
