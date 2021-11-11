import { CheckoutItemModel } from "@models/checkout-item.model";

import {
  CheckoutItemAttributes,
  CheckoutItemCreationAttributes,
} from "@types-internal/checkout-item/checkout-item-attributes";

export const createCheckoutItems = async (
  checkoutId: string,
  providersIds: string[]
): Promise<CheckoutItemAttributes[] | null> => {
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
};
