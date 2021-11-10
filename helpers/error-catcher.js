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
exports.errorCatcher = void 0;
var errorCatcher = function (formedError) {
    var _a;
    var responseCode = (_a = formedError.responseCode) !== null && _a !== void 0 ? _a : RESPONSE_CODES.S_ERROR_INTERNAL;
    throw __assign({ responseCode: responseCode }, formedError);
};
exports.errorCatcher = errorCatcher;
