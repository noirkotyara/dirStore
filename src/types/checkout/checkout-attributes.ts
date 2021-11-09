import { Optional } from "sequelize";

import { CheckoutStatus } from "@enums/checkout-status";

export interface CheckoutAttributes {
  id: string;
  userId: string;
  status?: CheckoutStatus;
  invoice?: string;
}

export interface CheckoutCreationAttributes
  extends Optional<CheckoutAttributes, "id" | "invoice"> {}
