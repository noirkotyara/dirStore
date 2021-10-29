var seq = require("sequelize");
var seqConnection = require("../services/connectDBSequelize").seqConnection;

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
    firstName: {
      type: seq.DataTypes.STRING(35),
      field: "first_name",
    },
    lastName: {
      type: seq.DataTypes.STRING(35),
      field: "last_name",
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
  },
  {
    tableName: "User",
    timestamps: true,
    createdAt: "created_date",
    updatedAt: "updated_date",
  }
);

console.log(userModel === seqConnection.models.User); // true

module.exports = userModel;
