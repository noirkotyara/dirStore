import {
  CheckoutItemAttributes,
  CheckoutItemCreationAttributes,
} from "../../types/CheckoutItem";

import { CheckoutItemModel } from "../../models/checkoutItem.model";

// @ts-ignore
import providerModel from "./../../models/provider.model";

export const createCheckoutItems = async (
  checkoutId: string,
  providersIds: string[]
): Promise<CheckoutItemAttributes[] | undefined> => {
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
