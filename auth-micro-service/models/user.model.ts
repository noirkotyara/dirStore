import { DataTypes, ModelDefined, UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";

import { IdentifierModel } from "./identifier.model";

import { seqConnection } from "@services/connectors/connect-db-sequelize";

import {
  UserAttributes,
  UserCreationAttributes,
} from "@types-internal/user/user-attributes";

export const UserModel: ModelDefined<UserAttributes, UserCreationAttributes> =
  seqConnection.define(
    "User",
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: UUIDV4,
      },
      type: {
        type: DataTypes.ENUM("ADMIN", "USER"),
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(254),
      },
      phone: {
        type: DataTypes.STRING(50),
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
      tableName: "User",
      timestamps: true,
      hooks: {
        beforeCreate: (model) => {
          if (!model.getDataValue("username")) {
            const createdUsername = model.getDataValue("email").split("@")[0];
            model.setDataValue("username", createdUsername);
          }
          const salt = bcrypt.genSaltSync();
          const encryptedPassword = bcrypt.hashSync(
            model.getDataValue("password"),
            salt
          );
          model.setDataValue("password", encryptedPassword);
        },
      },
    }
  );

UserModel.hasOne(IdentifierModel, {
  foreignKey: "userId",
  as: "identifier",
  onDelete: "CASCADE",
});
