"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderOperator = void 0;
var orderOperator = function (value) {
    if (value === null || value === void 0 ? void 0 : value.by) {
        return { order: [[value.by, value.direction]] };
    }
    return {};
};
exports.orderOperator = orderOperator;
