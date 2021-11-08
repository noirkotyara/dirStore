"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var sequelize_1 = require("sequelize");
var bcrypt_1 = __importDefault(require("bcrypt"));
var identifier_model_1 = require("./identifier.model");
var connect_db_sequelize_1 = require("../services/connectors/connect-db-sequelize");
exports.UserModel = connect_db_sequelize_1.seqConnection.define("User", {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("ADMIN", "USER"),
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(254),
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    createdAt: {
        field: "created_date",
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        field: "updated_date",
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    tableName: "User",
    timestamps: true,
    hooks: {
        beforeCreate: function (model, options) {
            if (!model.getDataValue("username")) {
                var createdUsername = model.getDataValue("email").split("@")[0];
                model.setDataValue("username", createdUsername);
            }
            var salt = bcrypt_1.default.genSaltSync();
            var encryptedPassword = bcrypt_1.default.hashSync(model.getDataValue("password"), salt);
            model.setDataValue("password", encryptedPassword);
        },
    },
});
exports.UserModel.hasOne(identifier_model_1.IdentifierModel, {
    foreignKey: "userId",
    as: "identifier",
    onDelete: "CASCADE",
});
