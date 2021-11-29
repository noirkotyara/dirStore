"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerStorage = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var multerStorage = function (directoryId) { return multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var directoryName = path_1.default.join(__dirname, "../../../uploads", directoryId);
        if (!fs_1.default.existsSync(directoryName)) {
            fs_1.default.mkdirSync(directoryName);
        }
        cb(null, directoryName);
    },
    filename: function (req, file, cb) {
        var ending = file.originalname.split(".").pop();
        var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "." + ending);
    }
}); };
exports.multerStorage = multerStorage;
