var seq = require("sequelize");
var bcrypt = require("bcrypt");

var seqConnection = require("../services/connect-db-sequelize").seqConnection;

var identifierModel = require("./identifier.model");

var userModel = seqConnection.define(
  "User",
  {
    id: {
      type: seq.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: seq.Sequelize.UUIDV4,
    },
    type: {
      type: seq.DataTypes.ENUM("ADMIN", "USER"),
    },
    username: {
      type: seq.DataTypes.STRING(50),
      unique: true,
    },
    email: {
      type: seq.DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    password: {
      type: seq.DataTypes.STRING(254),
    },
    phone: {
      type: seq.DataTypes.STRING(50),
    },
    createdAt: {
      field: "created_date",
      type: seq.DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_date",
      type: seq.DataTypes.DATE,
    },
  },
  {
    tableName: "User",
    timestamps: true,
    hooks: {
      beforeCreate: function (model) {
        if (!model.username) {
          model.username = model.email.split("@")[0];
        }
        var salt = bcrypt.genSaltSync();
        model.password = bcrypt.hashSync(model.password, salt);
      },
    },
  }
);

userModel.hasOne(identifierModel, {
  foreignKey: "userId",
  as: "identifier",
  onDelete: "CASCADE",
});

module.exports = userModel;
