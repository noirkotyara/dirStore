var seq = require("sequelize");

var seqConnection = require("../services/connect-db-sequelize").seqConnection;

var delivererModel = seqConnection.define(
  "Deliverer",
  {
    id: {
      type: seq.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: seq.Sequelize.UUIDV4,
    },
    name: {
      type: seq.DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: seq.DataTypes.STRING(100),
    },
    phone: {
      type: seq.DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: seq.DataTypes.STRING(50),
      allowNull: false,
    },
    deliveryPrice: {
      type: seq.DataTypes.DECIMAL(7, 2),
      field: "delivery_price",
      defaultValue: 0,
    },
  },
  {
    tableName: "Deliverer",
    timestamps: false,
    hooks: {},
  }
);

module.exports = delivererModel;
