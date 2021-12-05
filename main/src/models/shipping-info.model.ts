import { DataTypes, ModelDefined, UUIDV4 } from "sequelize";

import { seqConnection } from "@services/connectors/connect-db-sequelize";

import { ShippingAttributes, ShippingCreationAttributes } from "@types-internal/shipping/shipping-attributes";

export const ShippingInfoModel: ModelDefined<ShippingAttributes,
  ShippingCreationAttributes> = seqConnection.define(
  "Shipping_Info",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: UUIDV4
    },
    fullName: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: "full_name"
    },
    country: {
      type: DataTypes.STRING(40)
    },
    streetAddress: {
      type: DataTypes.STRING(100),
      field: "street_address"
    },
    stateProvinceRegion: {
      type: DataTypes.STRING(70),
      field: "state_province_region"
    },
    city: {
      type: DataTypes.STRING(50),
    },
    postCode: {
      type: DataTypes.STRING(10),
      field: "post_code"
    },
    emailAddress: {
      type: DataTypes.STRING(50),
      field: "email_address"
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    checkoutId: {
      type: DataTypes.STRING(35),
      allowNull: false,
      field: "checkout_id"
    },
    createdAt: {
      field: "created_date",
      type: DataTypes.DATE
    },
    updatedAt: {
      field: "updated_date",
      type: DataTypes.DATE
    }
  },
  {
    tableName: "Shipping_Info",
    timestamps: true
  }
);
