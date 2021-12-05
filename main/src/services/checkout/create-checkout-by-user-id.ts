import { CheckoutModel } from "@models/checkout.model";

import { BillingAttributes } from "@types-internal/checkout/billing-attributes";
import { BillingInfo } from "@types-internal/checkout/billing-info";

import { CheckoutStatus } from "@enums/checkout-status";

export const createCheckoutByUserId = async (
  userId: string,
  checkoutInfo: BillingInfo
): Promise<BillingAttributes | null> => {
  const createdCheckout = await CheckoutModel.create({
    userId,
    status: CheckoutStatus.ACTIVE,
    ...checkoutInfo
  });
  return createdCheckout ? createdCheckout.get() : null;
};
