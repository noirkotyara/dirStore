import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  Model,
  UUIDV4
} from "sequelize";
import bcrypt from "bcrypt";


import { UserAttributes, UserCreationAttributes } from "@types-internal/user/user-attributes";
import { UserType } from "@enums/user-type";
import { IdentifierAttributes } from "@types-internal/user/identifier-attributes";
import { IdentifierModel } from "@models/identifier.model";
import { seqConnection } from "@services/connectors/connect-db-sequelize";

export class UserModel extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: string; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public type!: UserType;
  public username!: string;
  public email!: string;
  public password!: string;
  public phone?: string | null;
  public token?: string;
  
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addIdentifier!: HasManyAddAssociationMixin<IdentifierAttributes, number>;
  public hasIdentifier!: HasManyHasAssociationMixin<IdentifierAttributes, number>;
  public createIdentifier!: HasManyCreateAssociationMixin<IdentifierAttributes>;

  public readonly identifier!: IdentifierAttributes & { [key: string]: unknown }; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    identifier: Association<UserModel, IdentifierModel>;
  };
}


UserModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: UUIDV4
    },
    type: {
      type: DataTypes.ENUM("ADMIN", "USER")
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(254)
    },
    phone: {
      type: DataTypes.STRING(50)
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
    tableName: "User",
    sequelize: seqConnection,
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
      }
    }
  }
);

UserModel.hasOne(IdentifierModel, {
  foreignKey: "userId",
  as: "identifier",
  onDelete: "CASCADE"
});
