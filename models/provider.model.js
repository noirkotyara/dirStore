var seq = require("sequelize");

var seqConnection = require("../services/connectDBSequelize").seqConnection;

var providerModel = seqConnection.define(
  "Provider",
  {
    id: {
      type: seq.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: seq.Sequelize.UUIDV4,
    },
    productId: {
      type: seq.DataTypes.STRING(50),
      field: "product_id",
      require: true,
    },
    delivererId: {
      type: seq.DataTypes.STRING(50),
      field: "deliverer_id",
      require: true,
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
    tableName: "Provider",
    timestamps: true,
    hooks: {},
  }
);

module.exports = providerModel;
