function isEmpty(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

module.exports = { isEmpty: isEmpty };
