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
    id: obj.id,
    name: obj.name,
    description: obj.description,
    price: obj.price,
    amount: obj.amount,
    created_date: obj.createdDate,
    updated_date: obj.updatedDate,
  };
}

module.exports = {
  inCamel: inCamel,
  inSnake: inSnake,
};
