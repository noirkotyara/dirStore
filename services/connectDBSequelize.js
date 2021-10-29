var sequelizeORM = require("sequelize");

var seqConnection = new sequelizeORM.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = { seqConnection: seqConnection };
