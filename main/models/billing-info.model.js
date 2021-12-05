"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingInfoModel = void 0;
var sequelize_1 = require("sequelize");
var connect_db_sequelize_1 = require("@services/connectors/connect-db-sequelize");
exports.BillingInfoModel = connect_db_sequelize_1.seqConnection.define("Billing_Info", {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: sequelize_1.UUIDV4
    },
    cardNumber: {
        type: sequelize_1.DataTypes.NUMBER(),
        field: "card_number"
    },
    cardName: {
        type: sequelize_1.DataTypes.STRING(40),
        field: "card_name"
    },
    expiryDate: {
        type: sequelize_1.DataTypes.STRING(40),
        field: "expiry_date"
    },
    cvv: {
        type: sequelize_1.DataTypes.NUMBER()
    },
    checkoutId: {
        type: sequelize_1.DataTypes.STRING(35),
        allowNull: false,
        field: "checkout_id"
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
    tableName: "Billing_Info",
    timestamps: true
});
