var delivererReformator = require("./../controllers/deliverer/helpers/delivererCaseReformator");

var knexConnection = require("./../services/connectDBKnex").knexConnection;

function createDeliverer(delivererInfo, callback) {
  var reformatedDelivererInfo = delivererReformator.inSnake(delivererInfo);

  return knexConnection
    .insert(reformatedDelivererInfo)
    .into("Deliverer")
    .asCallback(callback);
}

function getDelivererById(delivererId, callback) {
  return knexConnection("Deliverer")
    .where({ id: delivererId })
    .asCallback(callback);
}

function getDelivererList(callback) {
  return knexConnection.select().from("Deliverer").asCallback(callback);
}

function updateDelivererById(id, fields, callback) {
  var preparedFields = delivererReformator.inSnake(fields);

  return knexConnection("Deliverer")
    .where({ id: id })
    .update(preparedFields)
    .asCallback(callback);
}

function deleteDelivererById(id, callback) {
  return knexConnection("Deliverer")
    .where({ id: id })
    .del()
    .asCallback(callback);
}

function getProductDeliverers(productId, callback) {
  return knexConnection("Deliverer")
    .select(
      "Deliverer.id",
      "Deliverer.name",
      "Deliverer.description",
      "Deliverer.delivery_price",
      "Deliverer.phone",
      "Deliverer.address"
    )
    .join("Provider", "Deliverer.id", "=", "Provider.deliverer_id")

    .where("Provider.product_id", "=", productId.toString())

    .asCallback(callback);
}

module.exports = {
  createDeliverer: createDeliverer,
  getDelivererById: getDelivererById,
  getDelivererList: getDelivererList,
  updateDelivererById: updateDelivererById,
  deleteDelivererById: deleteDelivererById,
  getProductDeliverers: getProductDeliverers,
};
