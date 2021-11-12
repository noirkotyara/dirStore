"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeOperator = void 0;
var sequelize_1 = require("sequelize");
var likeOperator = function (fieldName, fieldValue) {
    var _a, _b;
    if (fieldValue) {
        return _a = {}, _a[fieldName] = (_b = {}, _b[sequelize_1.Op.substring] = fieldValue, _b), _a;
    }
    return {};
};
exports.likeOperator = likeOperator;
