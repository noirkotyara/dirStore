import { Optional } from "sequelize";

export interface CheckoutItemAttributes {
  id?: string;
  checkoutId: string;
  providerId: string;
}

export interface CheckoutItemCreationAttributes
  extends Optional<CheckoutItemAttributes, "id"> {}
