"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessageCatcher = void 0;
// @ts-ignore
var message_catcher_1 = require("message-catcher");
var ErrorMessageCatcher = /** @class */ (function () {
    function ErrorMessageCatcher(errorMessage) {
        this.responseCode = message_catcher_1.RESPONSE_CODES.S_ERROR_INTERNAL;
        this.data = errorMessage;
    }
    return ErrorMessageCatcher;
}());
exports.ErrorMessageCatcher = ErrorMessageCatcher;
