import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  Model
} from "sequelize";

import { IdentifierAttributes, IdentifierCreationAttributes } from "@types-internal/user/identifier-attributes";
import { UserModel } from "@models/user.model";

export class IdentifierModel extends Model<IdentifierAttributes, IdentifierCreationAttributes>
  implements IdentifierAttributes {
  public id!: string; // Note that the `null assertion` `!` is required in strict mode.
  public firstName!: string;
  public lastName!: string;
  public code!: number;
  public publisher!: string;


  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public addUser!: HasManyAddAssociationMixin<UserModel, number>;
  public hasUser!: HasManyHasAssociationMixin<UserModel, number>;
  public createUser!: HasManyCreateAssociationMixin<UserModel>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly identifier!: IdentifierAttributes; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    identifier: Association<UserModel, UserModel>;
  };
}


// export const IdentifierModel: ModelDefined<
//   IdentifierAttributes,
//   IdentifierCreationAttributes
// > = seqConnection.define(
//   "Identifier",
//   {
//     id: {
//       type: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//       unique: true,
//       defaultValue: seq.UUIDV4,
//     },
//     firstName: {
//       type: DataTypes.STRING(35),
//       field: "first_name",
//     },
//     lastName: {
//       type: DataTypes.STRING(35),
//       field: "last_name",
//     },
//     publisher: {
//       type: DataTypes.STRING(50),
//     },
//     code: {
//       type: DataTypes.STRING(15),
//     },
//     userId: {
//       type: DataTypes.STRING(35),
//       references: { model: UserModel, key: "id" },
//       field: "user_id",
//     },
//   },
//   {
//     tableName: "Identifier",
//     timestamps: false,
//   }
// );
