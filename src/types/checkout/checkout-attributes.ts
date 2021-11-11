import { Optional } from "sequelize";

import { CheckoutStatus } from "@enums/checkout-status";

import { CheckoutItemAttributes } from "@types-internal/checkout-item/checkout-item-attributes";

export interface CheckoutAttributes {
  id: string;
  userId: string;
  status?: CheckoutStatus;
  invoice?: string;
  providers?: CheckoutItemAttributes[];
}

export interface CheckoutCreationAttributes
  extends Optional<CheckoutAttributes, "id" | "invoice" | "providers"> {}
