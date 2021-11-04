"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierModel = void 0;
var sequelize_1 = __importStar(require("sequelize"));
var connect_db_sequelize_1 = require("../services/connect-db-sequelize");
var user_model_1 = require("./user.model");
exports.IdentifierModel = connect_db_sequelize_1.seqConnection.define("Identifier", {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: sequelize_1.default.UUIDV4,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(35),
        field: "first_name",
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(35),
        field: "last_name",
    },
    publisher: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    code: {
        type: sequelize_1.DataTypes.STRING(15),
    },
    userId: {
        type: sequelize_1.DataTypes.STRING(35),
        references: { model: user_model_1.UserModel, key: "id" },
        field: "user_id",
        // foreignKey: "FK_identifier_user",
    },
}, {
    tableName: "Identifier",
    timestamps: false,
});
