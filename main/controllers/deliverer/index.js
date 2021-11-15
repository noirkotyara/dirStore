var getDelivererList = require("./get-deliverers-list");
var delivererRestService = require("./deliverer.controller");

module.exports = {
  getDelivererList: getDelivererList.getDelivererList,
  getDelivererById: delivererRestService.getDelivererById,
  updateDeliverer: delivererRestService.updateDeliverer,
  createDeliverer: delivererRestService.createDeliverer,
  deleteDeliverer: delivererRestService.deleteDeliverer
};