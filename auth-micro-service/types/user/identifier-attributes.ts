import { Optional } from "sequelize";

export interface IdentifierAttributes {
  // [key: string]: string | number | undefined;

  id: string;
  firstName?: string;
  lastName?: string;
  code?: number;
  publisher?: string;
  userId: string;
}

export interface IdentifierCreationAttributes
  extends Optional<IdentifierAttributes, "id"> {
}
