import { CheckoutModel } from "@models/checkout.model";

import { CheckoutAttributes } from "@types-internal/checkout/checkout-attributes";
import ProviderModel from "@models/provider.model";

export const getCheckoutById = async (
  checkoutId: string
): Promise<CheckoutAttributes | null> => {
  const createdCheckout = await CheckoutModel.findOne({
    where: { id: checkoutId },
    include: [
      {
        model: ProviderModel,
        as: "providers",
        through: {
          attributes: [],
        },
      },
    ],
  });
  return createdCheckout ? createdCheckout.get() : null;
};
