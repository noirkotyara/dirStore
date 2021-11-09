"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModel = void 0;
var sequelize_1 = require("sequelize");
var connect_db_sequelize_1 = require("../services/connectors/connect-db-sequelize");
var user_model_1 = require("./user.model");
var checkout_status_1 = require("../enums/checkout-status");
exports.CheckoutModel = connect_db_sequelize_1.seqConnection.define("Checkout", {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING(35),
        references: { model: user_model_1.UserModel, key: "id" },
        allowNull: false,
        field: "user_id",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(checkout_status_1.CheckoutStatus.DRAFT, checkout_status_1.CheckoutStatus.ACTIVE, checkout_status_1.CheckoutStatus.PENDING, checkout_status_1.CheckoutStatus.CONFIRMED, checkout_status_1.CheckoutStatus.IN_PROGRESS, checkout_status_1.CheckoutStatus.ARRIVED, checkout_status_1.CheckoutStatus.DECLINED, checkout_status_1.CheckoutStatus.RETURNED, checkout_status_1.CheckoutStatus.FULLFILLED),
        defaultValue: checkout_status_1.CheckoutStatus.DRAFT,
    },
    invoice: {
        type: sequelize_1.DataTypes.STRING(35),
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
    tableName: "Checkout",
    timestamps: true,
    hooks: {
        beforeCreate: function (model, options) {
            var createdInvoice = model.getDataValue("id") + model.getDataValue("userId");
            model.setDataValue("invoice", createdInvoice);
        },
    },
});
