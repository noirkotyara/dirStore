import { DataTypes, ModelDefined, UUIDV4 } from "sequelize";

import { seqConnection } from "@services/connectors/connect-db-sequelize";

import { BillingAttributes, BillingCreationAttributes } from "@types-internal/billing/billing-attributes";

export const BillingInfoModel: ModelDefined<BillingAttributes,
  BillingCreationAttributes> = seqConnection.define(
  "Billing_Info",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: UUIDV4
    },
    cardNumber: {
      type: DataTypes.NUMBER(),
      field: "card_number"
    },
    cardName: {
      type: DataTypes.STRING(40),
      field: "card_name"
    },
    expiryDate: {
      type: DataTypes.STRING(40),
      field: "expiry_date"
    },
    cvv: {
      type: DataTypes.NUMBER()
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
    tableName: "Billing_Info",
    timestamps: true
  }
);
