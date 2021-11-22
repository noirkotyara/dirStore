"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierModel = void 0;
var sequelize_1 = require("sequelize");
var IdentifierModel = /** @class */ (function (_super) {
    __extends(IdentifierModel, _super);
    function IdentifierModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IdentifierModel;
}(sequelize_1.Model));
exports.IdentifierModel = IdentifierModel;
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
