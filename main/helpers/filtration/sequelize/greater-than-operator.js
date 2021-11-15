"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greaterThanOperator = void 0;
var sequelize_1 = require("sequelize");
var greaterThanOperator = function (fieldName, fieldValue) {
    var _a, _b;
    if (fieldValue) {
        return _a = {}, _a[fieldName] = (_b = {}, _b[sequelize_1.Op.gte] = fieldValue, _b), _a;
    }
    return {};
};
exports.greaterThanOperator = greaterThanOperator;
