var seq = require("sequelize");

var seqConnection =
  require("../services/connectors/connect-db-sequelize").seqConnection;

var productModel = seqConnection.define(
  "Product",
  {
    id: {
      type: seq.DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: seq.Sequelize.UUIDV4
    },
    name: {
      type: seq.DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: seq.DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: seq.DataTypes.DECIMAL(7, 2),
      defaultValue: 0
    },
    amount: {
      type: seq.DataTypes.INTEGER(),
      defaultValue: 0
    },
    category: {
      type: seq.DataTypes.ENUM("AUTO", "ANIMALS", "CHEMICALS", "FOOD", "SPORT", "HEALTHCARE")
    },
    createdAt: {
      field: "created_date",
      type: seq.DataTypes.DATE
    },
    updatedAt: {
      field: "updated_date",
      type: seq.DataTypes.DATE
    }
  },
  {
    tableName: "Product",
    timestamps: true
  }
);

module.exports = productModel;
