"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minMaxQuery = void 0;
var minMaxQuery = function (columnName, filter, queryBuilder) {
    if (filter.min && filter.max) {
        queryBuilder.whereBetween(columnName, [filter.min, filter.max]);
        return;
    }
    if (filter.min) {
        queryBuilder.where(columnName, ">=", filter.min);
    }
    if (filter.max) {
        queryBuilder.where(columnName, "<=", filter.max);
    }
};
exports.minMaxQuery = minMaxQuery;
