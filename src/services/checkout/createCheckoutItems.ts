import {
  CheckoutItemAttributes,
  CheckoutItemCreationAttributes,
} from "../../types/CheckoutItem";

import { CheckoutItemModel } from "../../models/checkoutItem.model";

export const createCheckoutItems = async (
  checkoutId: string,
  providersIds: string[]
): Promise<CheckoutItemAttributes[]> => {
  const checkoutItems: CheckoutItemCreationAttributes[] = providersIds.map(
    (providerId) => {
      return { checkoutId, providerId };
    }
  );

  const createdCheckoutItems = await CheckoutItemModel.bulkCreate(
    checkoutItems
  );

  return createdCheckoutItems.map((item) => item.get());
};
