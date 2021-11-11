import { DataTypes, ModelDefined, UUIDV4 } from "sequelize";

import { seqConnection } from "@services/connectors/connect-db-sequelize";

import { UserModel } from "./user.model";

import {
  CheckoutAttributes,
  CheckoutCreationAttributes,
} from "../types/checkout/checkout-attributes";

import { CheckoutStatus } from "@enums/checkout-status";

export const CheckoutModel: ModelDefined<
  CheckoutAttributes,
  CheckoutCreationAttributes
> = seqConnection.define(
  "Checkout",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: UUIDV4,
    },
    userId: {
      type: DataTypes.STRING(35),
      references: { model: UserModel, key: "id" },
      allowNull: false,
      field: "user_id",
    },
    status: {
      type: DataTypes.ENUM(
        CheckoutStatus.DRAFT,
        CheckoutStatus.ACTIVE,
        CheckoutStatus.PENDING,
        CheckoutStatus.CONFIRMED,
        CheckoutStatus.IN_PROGRESS,
        CheckoutStatus.ARRIVED,
        CheckoutStatus.DECLINED,
        CheckoutStatus.RETURNED,
        CheckoutStatus.FULLFILLED
      ),
      defaultValue: CheckoutStatus.DRAFT,
    },
    invoice: {
      type: DataTypes.STRING(35),
    },
    createdAt: {
      field: "created_date",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_date",
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Checkout",
    timestamps: true,
    hooks: {
      beforeCreate: (model) => {
        const createdInvoice =
          model.getDataValue("id") + model.getDataValue("userId");
        model.setDataValue("invoice", createdInvoice);
      },
    },
  }
);
