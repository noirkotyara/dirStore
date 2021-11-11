function inCamel(obj) {
  return {
    id: obj.id,
    name: obj.name,
    description: obj.description,
    price: obj.price,
    amount: obj.amount,
    createdDate: obj.created_date,
    updatedDate: obj.updated_date,
  };
}

function inSnake(obj) {
  return {
    id: obj.id || undefined,
    name: obj.name || undefined,
    description: obj.description || undefined,
    price: obj.price || undefined,
    amount: obj.amount || undefined,
    created_date: obj.createdDate || undefined,
    updated_date: obj.updatedDate || undefined,
  };
}

module.exports = {
  inCamel: inCamel,
  inSnake: inSnake,
};
