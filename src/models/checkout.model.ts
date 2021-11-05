import { DataTypes, ModelDefined, UUIDV4 } from "sequelize";

import { UserAttributes, UserCreationAttributes } from "../types/User";

import { seqConnection } from "../services/connect-db-sequelize";
import { UserModel } from "./user.model";

export const CheckoutModel: ModelDefined<
  UserAttributes,
  UserCreationAttributes
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
      field: "user_id",
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
  }
);
