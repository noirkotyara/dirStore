var ff = require("ff");
var uuid = require("uuid");

var RESPONSE_CODES = require("message-catcher").RESPONSE_CODES;

var myLodash = require("../../helpers/lodash");
var productReformator = require("./helpers/product-case-reformator");

var productService = require("../../services/product.service");

var createProduct = function (productInfo, next) {
  try {
    var newProduct = myLodash.deepClone(productInfo);
    newProduct.id = uuid.v4();

    var f = ff(
      this,
      productService.createTable,
      saveProduct,
      getSavedProduct,
      checkProductSave
    ).onComplete(onCompleteHandler);

    function saveProduct() {
      productService.saveProduct(newProduct, f.wait());
    }

    function getSavedProduct() {
      productService.getProductById(newProduct.id, f.slotPlain(2));
    }

    function checkProductSave(error, results) {
      if (error) {
        return f.fail({
          responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
          data: error,
        });
      }

      if (myLodash.isEmpty(results)) {
        return f.fail({
          responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
          data: "Created product is not founded",
        });
      }

      f.pass(results[0]);
    }

    function onCompleteHandler(error, savedProduct) {
      if (error) {
        return next(next);
      }
      next({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: savedProduct,
          message: "Product is created successfully",
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

var getProductsList = function (next) {
  var f = ff(this, getProducts, checkAndReformateResults).onComplete(
    onCompleteHandler
  );

  function getProducts() {
    productService.getProductsList(f.slotPlain(2));
  }

  function checkAndReformateResults(error, productLists) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }
    var reformatedProductsList = productLists.map(function (item) {
      return productReformator.inCamel(item);
    });
    f.pass(reformatedProductsList);
  }

  function onCompleteHandler(error, productList) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: productList,
        message: "Products list",
      },
    });
  }
};

var getProductById = function (productId, next) {
  var productInfo = {};

  var f = ff(
    this,
    getProductInfo,
    getDeliverersByProductId,
    checkDeliverersList
  ).onComplete(onCompleteHandler);

  function getProductInfo() {
    productService.getProductById(productId, f.slotPlain(2));
  }

  function getDeliverersByProductId(error, products) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }

    if (myLodash.isEmpty(products)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product does not exist",
      });
    }

    productInfo = myLodash.deepClone(products[0]);

    productService.getProductDeliverers(productId, f.slotPlain(2));
  }

  function checkDeliverersList(error, deliverersList) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
        data: error,
      });
    }
    productInfo.deliverers = deliverersList;
  }

  function onCompleteHandler(error) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: productInfo,
        message: "Deliverer list of the product with id: " + productId,
      },
    });
  }
};

var updateProductById = function (productId, productFields, next) {
  var f = ff(
    this,
    updateProduct,
    checkAndGetProduct,
    checkAndPrepareProduct
  ).onComplete(onCompleteHandler);

  function updateProduct() {
    productService.updateProductById(productId, productFields, f.slotPlain(2));
  }

  function checkAndGetProduct(error) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }

    productService.getProductById(productId, f.slotPlain(2));
  }

  function checkAndPrepareProduct(error, results) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }

    if (myLodash.isEmpty(results)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product with id: " + productId + " is not existed",
      });
    }

    f.pass(results[0]);
  }

  function onCompleteHandler(error, updatedProduct) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: updatedProduct,
        message: "Product updated with id: " + productId,
      },
    });
  }
};

var deleteProduct = function (productId, next) {
  var f = ff(this, getProduct, checkAndDeleteProduct).onComplete(
    onCompleteHandler
  );

  function getProduct() {
    productService.getProductById(productId, f.slotPlain(2));
  }

  function checkAndDeleteProduct(error, results) {
    if (error) {
      return f.fail({
        responseCode: RESPONSE_CODES.DB_ERROR_MYSQL,
        data: error,
      });
    }

    if (myLodash.isEmpty(results)) {
      return f.fail({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "Product with id: " + productId + " is not existed",
      });
    }
    var reformatedProduct = productReformator.inCamel(results[0]);
    f.pass(reformatedProduct);

    productService.deleteProductById(productId, f.slot());
  }

  function onCompleteHandler(error, deletedProduct) {
    if (error) {
      return next(error);
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS,
      data: {
        data: deletedProduct,
        message: "Product deleted successfully!",
      },
    });
  }
};

module.exports = {
  getProductsList: getProductsList,
  getProductById: getProductById,
  updateProductById: updateProductById,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
};
