import { Optional } from "sequelize";

export interface BillingAttributes {
  id: string;
  checkoutId: string;
  cardName: number;
  expiryDate: Date;
  cvv: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillingCreationAttributes
  extends Optional<BillingAttributes, "id" | "createdAt" | "updatedAt"> {
}
