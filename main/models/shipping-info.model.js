"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingInfoModel = void 0;
var sequelize_1 = require("sequelize");
var connect_db_sequelize_1 = require("@services/connectors/connect-db-sequelize");
exports.ShippingInfoModel = connect_db_sequelize_1.seqConnection.define("Shipping_Info", {
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: sequelize_1.UUIDV4
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
        field: "full_name"
    },
    country: {
        type: sequelize_1.DataTypes.STRING(40)
    },
    streetAddress: {
        type: sequelize_1.DataTypes.STRING(100),
        field: "street_address"
    },
    stateProvinceRegion: {
        type: sequelize_1.DataTypes.STRING(70),
        field: "state_province_region"
    },
    city: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    postCode: {
        type: sequelize_1.DataTypes.STRING(10),
        field: "post_code"
    },
    emailAddress: {
        type: sequelize_1.DataTypes.STRING(50),
        field: "email_address"
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
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
    tableName: "Shipping_Info",
    timestamps: true
});
