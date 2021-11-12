"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFilters = void 0;
var parse_into_array_1 = require("@helpers/filtration/parse-into-array");
var min_max_query_1 = require("@helpers/filtration/min-max-query");
var like_query_1 = require("@helpers/filtration/like-query");
var productFilters = function (queryBuilder, product) {
    var createdDate = product.createdDate, price = product.price, amount = product.amount, category = product.category, otherProductFilters = __rest(product, ["createdDate", "price", "amount", "category"]);
    if (category) {
        queryBuilder.whereIn("Product.category", (0, parse_into_array_1.parseIntoArray)(category));
    }
    if (amount) {
        queryBuilder.where("Product.amount", ">=", amount);
    }
    if (otherProductFilters) {
        (0, like_query_1.likeQuery)("Product", otherProductFilters, queryBuilder);
    }
    (0, min_max_query_1.minMaxQuery)("Product.price", price, queryBuilder);
    (0, min_max_query_1.minMaxQuery)("Product.created_date", createdDate, queryBuilder);
};
exports.productFilters = productFilters;
