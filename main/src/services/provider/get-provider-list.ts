import ProviderModel from "@models/provider.model";
import ProductModel from "@models/product.model";
import DelivererModel from "@models/deliverer.model";

import { ProviderAttributes } from "@types-internal/provider/provider-attributes";

export const getProviderList = async (): Promise<ProviderAttributes[] | null> => {
  const createdCheckout = await ProviderModel.findAll({
    attributes: {
      exclude: ["productId", "delivererId", "product_id", "deliverer_id"]
    },
    include: [
      { model: ProductModel, as: "product" },
      { model: DelivererModel, as: "deliverer" }
    ]
  });
  return createdCheckout ? createdCheckout.map(item => item.get()) : null;
};
