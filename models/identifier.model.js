var seq = require("sequelize");

var seqConnection = require("../services/connectDBSequelize").seqConnection;

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
    type: {
      type: seq.DataTypes.ENUM("ADMIN", "USER"),
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
  },
  {
    tableName: "Identifier",
    timestamps: false,
  }
);

identifierModel.associate = function (models) {
  identifierModel.hasOne(models.user, {
    foreignKey: "identifierId",
    as: "identifier",
    onDelete: "CASCADE",
  });
};

module.exports = identifierModel;
