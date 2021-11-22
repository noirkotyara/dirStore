import { Optional } from "sequelize";

export interface IdentifierAttributes {
  id: string;
  firstName?: string;
  lastName?: string;
  code?: number;
  publisher?: string;
  userId: string;
  deliveryAddress: string | null;
}

export interface IdentifierCreationAttributes
  extends Optional<IdentifierAttributes, "id"> {
}
