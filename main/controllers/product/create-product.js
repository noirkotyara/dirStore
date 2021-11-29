var ff = require("ff");
var uuid = require("uuid");
var fs = require("fs");
var path = require("path");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");

var productService = require("../../services/product/product.service");

var createProduct = function(productInfo, next) {
  try {
    var newProduct = myLodash.deepClone(productInfo);
    newProduct.id = uuid.v4();

    var f = ff(
      this,
      productService.createTable,
      saveProduct,
      saveProductImages,
      getSavedProduct,
      getSavedProductImages,
      checkProductSave
    ).onComplete(onCompleteHandler);

    function saveProduct() {
      productService.saveProduct(newProduct, f.wait());
    }

    function saveProductImages() {
      productService.saveImages(newProduct.id, newProduct.images, f.wait());
    }

    function getSavedProduct() {
      productService.getProductById(newProduct.id, f.slotPlain(2));
    }

    function getSavedProductImages(error, result) {
      newProduct = result[0];
      productService.getProductImages(newProduct.id, f.slotPlain(2));
    }

    function checkProductSave(error, results) {
      if (error) {
        return f.fail({
          responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
          dbData: error
        });
      }

      if (myLodash.isEmpty(results)) {
        return f.fail({
          responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
          message: "Created product is not founded"
        });
      }
      f.pass(results.map(function(result) {
        return result.name;
      }));
    }

    function onCompleteHandler(error, productImages) {
      if (error) {
        return next(next);
      }
      newProduct.images = productImages;

      next({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: newProduct,
          message: "Product is created successfully"
        }
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = createProduct;
