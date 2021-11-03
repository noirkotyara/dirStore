var seq = require("sequelize");

var seqConnection = require("../services/connectDBSequelize").seqConnection;

var userModel = require("./user.model");

var identifierModel = seqConnection.define(
  "Identifier",
  {
    id: {
      type: seq.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: seq.Sequelize.UUIDV4,
    },
    firstName: {
      type: seq.DataTypes.STRING(35),
      field: "first_name",
    },
    lastName: {
      type: seq.DataTypes.STRING(35),
      field: "last_name",
    },
    publisher: {
      type: seq.DataTypes.STRING(50),
    },
    code: {
      type: seq.DataTypes.STRING(15),
    },
    userId: {
      type: seq.DataTypes.STRING(35),
      references: { model: userModel, key: "id" },
      field: "user_id",
      foreignKey: "FK_identifier_user",
    },
  },
  {
    tableName: "Identifier",
    timestamps: false,
  }
);

// identifierModel.belongsTo(userModel, {
//   foreignKey: "FK_identifier_user",
//   targetKey: "id",
// });

module.exports = identifierModel;
