import { CheckoutModel } from "../../models/checkout.model";
import {
  CheckoutAttributes,
  CheckoutStatus,
  CheckoutType,
} from "../../types/Checkout";

export const createCheckoutByUserId = async (
  userId: string,
  checkoutInfo: CheckoutType
): Promise<CheckoutAttributes> => {
  const createdCheckout = await CheckoutModel.create({
    userId,
    status: CheckoutStatus.ACTIVE,
    ...checkoutInfo,
  });
  return createdCheckout.get();
};
