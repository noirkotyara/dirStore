"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inOperator = void 0;
var sequelize_1 = require("sequelize");
var inOperator = function (fieldName, arrayOfValues) {
    var _a, _b;
    if (arrayOfValues) {
        return _a = {}, _a[fieldName] = (_b = {}, _b[sequelize_1.Op.in] = arrayOfValues, _b), _a;
    }
    return {};
};
exports.inOperator = inOperator;
