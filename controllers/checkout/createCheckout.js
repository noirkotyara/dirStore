"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckout = void 0;
var message_catcher_1 = require("message-catcher");
var ErrorCatcher_1 = require("../../helpers/ErrorCatcher");
var ErrorMessageCatcher_1 = require("../../helpers/ErrorMessageCatcher");
var createCheckoutByUserId_1 = require("../../services/checkout/createCheckoutByUserId");
var createCheckoutItems_1 = require("../../services/checkout/createCheckoutItems");
var createCheckout = function (userId, checkoutInfo, next) { return __awaiter(void 0, void 0, void 0, function () {
    var createdCheckout, checkoutId, createdCheckoutItems, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, createCheckoutByUserId_1.createCheckoutByUserId)(userId, checkoutInfo)];
            case 1:
                createdCheckout = _a.sent();
                checkoutId = createdCheckout.id;
                if (!checkoutId) {
                    throw new ErrorMessageCatcher_1.ErrorMessageCatcher("Checkout is not created");
                }
                return [4 /*yield*/, (0, createCheckoutItems_1.createCheckoutItems)(checkoutId, checkoutInfo.providersIds)];
            case 2:
                createdCheckoutItems = _a.sent();
                if (!createdCheckoutItems) {
                    throw new ErrorMessageCatcher_1.ErrorMessageCatcher("Providers are not connected to the checkout");
                }
                next({
                    responseCode: message_catcher_1.RESPONSE_CODES.SUCCESS__CREATED,
                    data: {
                        data: createdCheckoutItems,
                        message: "Created checkout",
                    },
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (error_1 instanceof ErrorCatcher_1.ErrorCatcher || error_1 instanceof ErrorMessageCatcher_1.ErrorMessageCatcher) {
                    return [2 /*return*/, next(error_1)];
                }
                next({
                    responseCode: message_catcher_1.RESPONSE_CODES.DB_ERROR_SEQUELIZE,
                    data: error_1,
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createCheckout = createCheckout;
