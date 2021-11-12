"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reformateFilterOptions = void 0;
var reformateFilterOptions = function (options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var filters = {
        product: {
            category: (_a = options.p_category) !== null && _a !== void 0 ? _a : undefined,
            amount: (_b = options.p_amount) !== null && _b !== void 0 ? _b : undefined,
            createdDate: {
                max: (_c = options.p_createdDateMax) !== null && _c !== void 0 ? _c : undefined,
                min: (_d = options.p_createdDateMin) !== null && _d !== void 0 ? _d : undefined
            },
            description: (_e = options.p_description) !== null && _e !== void 0 ? _e : undefined,
            name: (_f = options.p_name) !== null && _f !== void 0 ? _f : undefined,
            price: {
                max: (_g = options.p_priceMax) !== null && _g !== void 0 ? _g : undefined,
                min: (_h = options.p_priceMin) !== null && _h !== void 0 ? _h : undefined
            }
        },
        deliverer: {
            name: (_j = options.d_name) !== null && _j !== void 0 ? _j : undefined,
            description: (_k = options.d_description) !== null && _k !== void 0 ? _k : undefined,
            deliveryPrice: {
                max: (_l = options.d_deliveryPriceMax) !== null && _l !== void 0 ? _l : undefined,
                min: (_m = options.d_deliveryPriceMin) !== null && _m !== void 0 ? _m : undefined
            }
        }
    };
    if (options.order_by) {
        var orderFilter = { order: { by: options.order_by, direction: (_o = options.order_direction) !== null && _o !== void 0 ? _o : "DESC" } };
        filters = __assign(__assign({}, filters), orderFilter);
    }
    return filters;
};
exports.reformateFilterOptions = reformateFilterOptions;
