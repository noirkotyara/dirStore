import { CheckoutModel } from "@models/checkout.model";

import { CheckoutAttributes } from "@types-internal/checkout/checkout-attributes";
import { CheckoutInfo } from "@types-internal/checkout/checkout-info";

import { CheckoutStatus } from "@enums/checkout-status";

export const createCheckoutByUserId = async (
  userId: string,
  checkoutInfo: CheckoutInfo
): Promise<CheckoutAttributes | null> => {
  const createdCheckout = await CheckoutModel.create({
    userId,
    status: CheckoutStatus.ACTIVE,
    ...checkoutInfo,
  });
  return createdCheckout ? createdCheckout.get() : null;
};
