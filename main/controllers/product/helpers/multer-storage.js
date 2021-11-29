"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerStorage = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var multerStorage = function () { return multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var directoryName = path_1.default.join(__dirname, "../../../uploads");
        // if (!fs.existsSync(directoryName)) {
        //   fs.mkdirSync(directoryName);
        // }
        cb(null, directoryName);
    },
    filename: function (req, file, cb) {
        var fileId = (0, uuid_1.v4)();
        var ending = file.originalname.split(".").pop();
        cb(null, fileId + "." + ending);
    }
}); };
exports.multerStorage = multerStorage;
