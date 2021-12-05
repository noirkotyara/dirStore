import { CheckoutModel } from "@models/checkout.model";

import { BillingAttributes } from "@types-internal/checkout/billing-attributes";
import ProviderModel from "@models/provider.model";
import ProductModel from "@models/product.model";
import DelivererModel from "@models/deliverer.model";

export const getCheckoutById = async (
  checkoutId: string
): Promise<BillingAttributes | null> => {
  const createdCheckout = await CheckoutModel.findOne({
    where: { id: checkoutId },
    include: [
      {
        model: ProviderModel,
        as: "providers",
        attributes: {
          exclude: ["productId", "delivererId", "product_id", "deliverer_id"]
        },
        through: {
          attributes: []
        },
        include: [
          { model: ProductModel, as: "product" },
          { model: DelivererModel, as: "deliverer" }
        ]
      }
    ]
  });
  return createdCheckout ? createdCheckout.get() : null;
};
