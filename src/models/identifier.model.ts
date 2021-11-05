import seq, { DataTypes } from "sequelize";

import { seqConnection } from "../services/connect-db-sequelize";

import { UserModel } from "./user.model";

export const IdentifierModel = seqConnection.define(
  "Identifier",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: seq.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING(35),
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(35),
      field: "last_name",
    },
    publisher: {
      type: DataTypes.STRING(50),
    },
    code: {
      type: DataTypes.STRING(15),
    },
    userId: {
      type: DataTypes.STRING(35),
      references: { model: UserModel, key: "id" },
      field: "user_id",
      // foreignKey: "FK_identifier_user",
    },
  },
  {
    tableName: "Identifier",
    timestamps: false,
  }
);
