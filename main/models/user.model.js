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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var sequelize_1 = require("sequelize");
var bcrypt_1 = __importDefault(require("bcrypt"));
var identifier_model_1 = require("@models/identifier.model");
var connect_db_sequelize_1 = require("@services/connectors/connect-db-sequelize");
var UserModel = /** @class */ (function (_super) {
    __extends(UserModel, _super);
    function UserModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserModel;
}(sequelize_1.Model));
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: sequelize_1.UUIDV4
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("ADMIN", "USER")
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(254)
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(50)
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
    tableName: "User",
    sequelize: connect_db_sequelize_1.seqConnection,
    timestamps: true,
    hooks: {
        beforeCreate: function (model) {
            if (!model.getDataValue("username")) {
                var createdUsername = model.getDataValue("email").split("@")[0];
                model.setDataValue("username", createdUsername);
            }
            var salt = bcrypt_1.default.genSaltSync();
            var encryptedPassword = bcrypt_1.default.hashSync(model.getDataValue("password"), salt);
            model.setDataValue("password", encryptedPassword);
        }
    }
});
UserModel.hasOne(identifier_model_1.IdentifierModel, {
    foreignKey: "userId",
    as: "identifier",
    onDelete: "CASCADE"
});
