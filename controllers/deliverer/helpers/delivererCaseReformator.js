function inCamel(obj) {
  return {
    id: obj.id,
    name: obj.name,
    description: obj.description,
    phone: obj.phone,
    address: obj.address,
    deliveryPrice: obj.delivery_price,
  };
}

function inSnake(obj) {
  return {
    id: obj.id,
    name: obj.name,
    description: obj.description,
    phone: obj.phone,
    address: obj.address,
    delivery_price: obj.deliveryPrice,
  };
}

module.exports = {
  inCamel: inCamel,
  inSnake: inSnake,
};
