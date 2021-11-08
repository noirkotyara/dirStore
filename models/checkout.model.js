"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModel = void 0;
var sequelize_1 = require("sequelize");
var connect_db_sequelize_1 = require("../services/connectors/connect-db-sequelize");
var user_model_1 = require("./user.model");
var Checkout_1 = require("../types/Checkout");
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
        type: sequelize_1.DataTypes.ENUM(Checkout_1.CheckoutStatus.DRAFT, Checkout_1.CheckoutStatus.ACTIVE, Checkout_1.CheckoutStatus.PENDING, Checkout_1.CheckoutStatus.CONFIRMED, Checkout_1.CheckoutStatus.IN_PROGRESS, Checkout_1.CheckoutStatus.ARRIVED, Checkout_1.CheckoutStatus.DECLINED, Checkout_1.CheckoutStatus.RETURNED, Checkout_1.CheckoutStatus.FULLFILLED),
        defaultValue: Checkout_1.CheckoutStatus.DRAFT,
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
