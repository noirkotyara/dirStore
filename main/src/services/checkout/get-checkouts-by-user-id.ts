import { CheckoutModel } from "@models/checkout.model";

import { CheckoutAttributes } from "@types-internal/checkout/checkout-attributes";


export const getCheckoutsByUserId = async (
  userId: string
): Promise<CheckoutAttributes[] | null> => {
  const createdCheckout = await CheckoutModel.findAll({
    where: { userId }
  });
  return createdCheckout
    ? createdCheckout.map((checkout) => checkout.get())
    : null;
};
