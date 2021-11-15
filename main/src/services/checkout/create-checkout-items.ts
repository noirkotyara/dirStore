import { CheckoutItemModel } from "@models/checkout-item.model";

import {
  CheckoutItemAttributes,
  CheckoutItemCreationAttributes
} from "@types-internal/checkout-item/checkout-item-attributes";

import { getProviderById } from "@services/provider/get-provider-by-id";

import ProductModel from "@models/product.model";

export const createCheckoutItems = async (
  checkoutId: string,
  providersIds: string[]
): Promise<CheckoutItemAttributes[] | null> => {
  try {
    await Promise.all(providersIds.map(async (providerId) => {
        const providerInfo = await getProviderById(providerId);
        if (!providerInfo) {
          throw new Error("Provider is not founded");
        }
        const productId = providerInfo.productId;
        return ProductModel.increment({ amount: -1 }, { where: { id: productId } });
      }
    ));

    const checkoutItems: CheckoutItemCreationAttributes[] = providersIds.map(
      (providerId) => {
        return { checkoutId, providerId };
      }
    );

    const createdCheckoutItems = await CheckoutItemModel.bulkCreate(
      checkoutItems
    );

    return createdCheckoutItems.length === 0
      ? null
      : createdCheckoutItems.map((item) => item.get());
  } catch (error) {
    return null;
  }

};
