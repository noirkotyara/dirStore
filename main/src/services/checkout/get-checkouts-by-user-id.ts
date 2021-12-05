import { CheckoutModel } from "@models/checkout.model";

import { BillingAttributes } from "@types-internal/checkout/billing-attributes";

export const getCheckoutsByUserId = async (
  userId: string
): Promise<BillingAttributes[] | null> => {
  const createdCheckout = await CheckoutModel.findAll({
    where: { userId }
  });
  return createdCheckout
    ? createdCheckout.map((checkout) => checkout.get())
    : null;
};
