"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inOperator = void 0;
var sequelize_1 = require("sequelize");
var parse_into_array_1 = require("@helpers/filtration/parse-into-array");
var inOperator = function (fieldName, fieldValue) {
    var _a, _b;
    if (fieldValue) {
        var arrayOfValues = (0, parse_into_array_1.parseIntoArray)(fieldValue);
        return _a = {}, _a[fieldName] = (_b = {}, _b[sequelize_1.Op.in] = arrayOfValues, _b), _a;
    }
    return {};
};
exports.inOperator = inOperator;
