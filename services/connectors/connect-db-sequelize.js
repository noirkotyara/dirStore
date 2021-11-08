"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seqConnection = void 0;
var sequelize_1 = __importDefault(require("sequelize"));
exports.seqConnection = new sequelize_1.default.Sequelize(process.env.DB_NAME || "name-no-provided", process.env.DB_USER || "user-no-provided", process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});
