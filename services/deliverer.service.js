var util = require("util");

var delivererReformator = require("../controllers/deliverer/helpers/deliverer-case-reformator");

var delivererModel = require("../models/deliverer.model");
var productModel = require("../models/product.model");

var knexConnection = require("./connect-db-knex").knexConnection;

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

function getDelivererProducts(delivererId, callback) {
  var c = util.callbackify(function () {
    return delivererModel.findOne({
      where: {
        id: delivererId,
      },
      include: {
        model: productModel,
        as: "products",
        through: {
          attributes: [],
        },
      },
    });
  });
  return c(callback);
}

module.exports = {
  createDeliverer: createDeliverer,
  getDelivererById: getDelivererById,
  getDelivererList: getDelivererList,
  updateDelivererById: updateDelivererById,
  deleteDelivererById: deleteDelivererById,
  getDelivererProducts: getDelivererProducts,
};
