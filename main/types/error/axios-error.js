"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAxiosError = void 0;
// error type check
var isAxiosError = function (error) {
    return error.isAxiosError;
};
exports.isAxiosError = isAxiosError;
