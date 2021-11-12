"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeQuery = void 0;
var likeQuery = function (tableName, filters, queryBuilder) {
    Object.entries(filters).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (value) {
            queryBuilder.where(tableName + "." + key, "like", "%" + value + "%");
        }
    });
};
exports.likeQuery = likeQuery;
