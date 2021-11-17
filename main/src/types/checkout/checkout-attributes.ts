import { CheckoutStatus } from "@enums/checkout-status";

import { CheckoutItemAttributes } from "@types-internal/checkout-item/checkout-item-attributes";
import { Optional } from "sequelize";

export interface CheckoutAttributes {
  id: string;
  userId: string;
  status?: CheckoutStatus;
  invoice?: string | null;
  providers?: CheckoutItemAttributes[];
}

export interface CheckoutCreationAttributes
  extends Optional<CheckoutAttributes, "id" | "invoice" | "providers"> {
}
