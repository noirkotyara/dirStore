"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModel = void 0;
var sequelize_1 = require("sequelize");
var connect_db_sequelize_1 = require("../services/connect-db-sequelize");
var user_model_1 = require("./user.model");
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
        field: "user_id",
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
});
