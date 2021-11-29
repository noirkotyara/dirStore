"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
var sequelize_1 = require("sequelize");
var connect_db_sequelize_1 = require("@services/connectors/connect-db-sequelize");
var product_model_1 = __importDefault(require("@models/product.model"));
exports.ImageModel = connect_db_sequelize_1.seqConnection.define("Image", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: {
        field: "created_date",
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        field: "updated_date",
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: "Image",
    timestamps: true
});
exports.ImageModel.belongsToMany(product_model_1.default, { through: "Product_Image", as: "images" });
product_model_1.default.belongsToMany(exports.ImageModel, { through: "Product_Image", as: "products" });
