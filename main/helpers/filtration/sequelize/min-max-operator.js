"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minMaxOperator = void 0;
var sequelize_1 = require("sequelize");
var minMaxOperator = function (fieldName, fieldValue) {
    var _a, _b, _c, _d, _e, _f;
    if (fieldValue.min && fieldValue.max) {
        return _a = {}, _a[fieldName] = (_b = {}, _b[sequelize_1.Op.between] = [fieldValue.min, fieldValue.max], _b), _a;
    }
    if (fieldValue.min) {
        return _c = {}, _c[fieldName] = (_d = {}, _d[sequelize_1.Op.gte] = fieldValue.min, _d), _c;
    }
    if (fieldValue.max) {
        return _e = {}, _e[fieldName] = (_f = {}, _f[sequelize_1.Op.lte] = fieldValue.max, _f), _e;
    }
    return {};
};
exports.minMaxOperator = minMaxOperator;
