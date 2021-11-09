"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutItemModel = void 0;
var sequelize_1 = require("sequelize");
var connect_db_sequelize_1 = require("@services/connectors/connect-db-sequelize");
var checkout_model_1 = require("./checkout.model");
var provider_model_1 = __importDefault(require("./provider.model"));
exports.CheckoutItemModel = connect_db_sequelize_1.seqConnection.define("Checkout_Item", {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    providerId: {
        type: sequelize_1.DataTypes.STRING(35),
        references: { model: provider_model_1.default, key: "id" },
        field: "provider_id",
    },
    checkoutId: {
        type: sequelize_1.DataTypes.STRING(35),
        references: { model: checkout_model_1.CheckoutModel, key: "id" },
        field: "checkout_id",
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
    tableName: "Checkout_Item",
    timestamps: true,
});
provider_model_1.default.belongsToMany(checkout_model_1.CheckoutModel, {
    through: exports.CheckoutItemModel,
    as: "checkouts",
    foreignKey: "provider_id",
});
checkout_model_1.CheckoutModel.belongsToMany(provider_model_1.default, {
    through: exports.CheckoutItemModel,
    as: "providers",
    foreignKey: "checkout_id",
});
exports.CheckoutItemModel.belongsTo(checkout_model_1.CheckoutModel);
exports.CheckoutItemModel.belongsTo(provider_model_1.default);
provider_model_1.default.hasMany(exports.CheckoutItemModel);
checkout_model_1.CheckoutModel.hasMany(exports.CheckoutItemModel);
