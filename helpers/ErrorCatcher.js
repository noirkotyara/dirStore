"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCatcher = void 0;
var ErrorCatcher = /** @class */ (function () {
    function ErrorCatcher(error) {
        this.responseCode = error.responseCode;
        this.data = error.data;
    }
    return ErrorCatcher;
}());
exports.ErrorCatcher = ErrorCatcher;
