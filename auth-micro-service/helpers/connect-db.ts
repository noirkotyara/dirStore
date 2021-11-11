import { seqConnection } from "@services/connectors/connect-db-sequelize";

export const testConnectionToDB = async (): Promise<void> => {
  console.log("SEQUELIZE: Checking database connection...");

  try {
    await seqConnection.authenticate();
    console.log("SEQUELIZE: Database connection OK!");
  } catch (error) {
    console.log("SEQUELIZE: Unable to connect to the database:", error);
    return process.exit(1);
  }
};
