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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProductImages = void 0;
var message_catcher_1 = require("message-catcher");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var response_catcher_1 = require("@helpers/response-catcher");
var error_catcher_1 = require("@helpers/error-catcher");
var create_image_1 = require("@services/image/create-image");
var saveProductImages = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var createdImagesId, multerStorage, upload, cdUpload;
    return __generator(this, function (_a) {
        createdImagesId = [];
        multerStorage = function () { return multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                var directoryName = path_1.default.join(__dirname, "../../uploads");
                cb(null, directoryName);
            },
            filename: function (req, file, cb) {
                var fileId = (0, uuid_1.v4)();
                var ending = file.originalname.split(".").pop();
                var fullyImageName = fileId + "." + ending;
                createdImagesId.push(fullyImageName);
                cb(null, fullyImageName);
            }
        }); };
        upload = (0, multer_1.default)({
            storage: multerStorage(),
            fileFilter: function (req, file, callback) {
                if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                    return callback(new Error("Only image files are allowed!"));
                }
                callback(null, true);
            }
        });
        cdUpload = upload.fields([{ name: "gallery", maxCount: 8 }]);
        cdUpload(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
            var createdImages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            next({
                                responseCode: message_catcher_1.RESPONSE_CODES.S_ERROR_INTERNAL,
                                message: err.toString()
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, create_image_1.createImages)(createdImagesId)];
                    case 1:
                        createdImages = _a.sent();
                        if (!createdImages) {
                            (0, error_catcher_1.errorCatcher)({
                                message: "Images are not saved"
                            });
                            return [2 /*return*/];
                        }
                        next((0, response_catcher_1.responseCatcher)({
                            responseCode: message_catcher_1.RESPONSE_CODES.SUCCESS,
                            data: {
                                data: createdImages,
                                message: "Product images store with directory id"
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.saveProductImages = saveProductImages;
