import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";
import { createCheckoutByUserId } from "../../services/checkout/create-checkout-by-user-id";
import { createCheckoutItems } from "../../services/checkout/create-checkout-items";
import { CheckoutInfo } from "../../types/checkout/checkout-info";
import { errorCatcher } from "../../helpers/error-catcher";
import { responseCatcher } from "../../helpers/response-catcher";
import { CheckoutItemAttributes } from "../../types/checkout-item/checkout-item-attributes";

export const createCheckout = async (
  userId: string,
  checkoutInfo: CheckoutInfo,
  next: NextFunction
) => {
  try {
    const createdCheckout = await createCheckoutByUserId(userId, checkoutInfo);

    if (!createdCheckout) {
      errorCatcher({
        message: "Checkout is not created",
      });
      return;
    }

    const createdCheckoutItems = await createCheckoutItems(
      createdCheckout.id,
      checkoutInfo.providersIds
    );

    if (!createdCheckoutItems) {
      errorCatcher({
        message: "Providers are not connected to the checkout",
      });
      return;
    }

    next(
      responseCatcher<CheckoutItemAttributes[]>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: createdCheckoutItems,
          message: "Created checkout",
        },
      })
    );
  } catch (error) {
    next(error);
  }
};
