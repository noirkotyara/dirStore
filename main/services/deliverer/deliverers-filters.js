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
exports.deliverersFilters = void 0;
var min_max_query_1 = require("@helpers/filtration/min-max-query");
var like_query_1 = require("@helpers/filtration/like-query");
var deliverersFilters = function (queryBuilder, deliverer) {
    var deliveryPrice = deliverer.deliveryPrice, otherDelivererFilters = __rest(deliverer, ["deliveryPrice"]);
    if (otherDelivererFilters) {
        (0, like_query_1.likeQuery)("Deliverer", otherDelivererFilters, queryBuilder);
    }
    (0, min_max_query_1.minMaxQuery)("Deliverer.delivery_price", deliveryPrice, queryBuilder);
};
exports.deliverersFilters = deliverersFilters;
