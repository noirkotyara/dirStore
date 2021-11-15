function inCamel(obj) {
  return {
    id: obj.id,
    productId: obj.product_id,
    delivererId: obj.deliverer_id,
    createdDate: obj.created_date,
    updatedDate: obj.updated_date,
  };
}

function inSnake(obj) {
  return {
    id: obj.id,
    product_id: obj.productId,
    deliverer_id: obj.delivererId,
    created_date: obj.createdDate,
    updated_date: obj.updatedDate,
  };
}

module.exports = {
  inCamel: inCamel,
  inSnake: inSnake,
};
