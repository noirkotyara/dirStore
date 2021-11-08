import sequelize from "sequelize";

export const seqConnection = new sequelize.Sequelize(
  process.env.DB_NAME || "name-no-provided",
  process.env.DB_USER || "user-no-provided",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
