import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";

import { createCheckoutByUserId } from "@services/checkout/create-checkout-by-user-id";
import { createCheckoutItems } from "@services/checkout/create-checkout-items";
import { getCheckoutById } from "@services/checkout/get-checkout-by-id";

import { errorCatcher } from "@helpers/error-catcher";
import { responseCatcher } from "@helpers/response-catcher";

import { BillingInfo } from "@types-internal/checkout/billing-info";
import { BillingAttributes } from "@types-internal/checkout/billing-attributes";

export const createCheckout = async (
  userId: string,
  checkoutInfo: BillingInfo,
  next: NextFunction
) => {
  try {
    const createdCheckout = await createCheckoutByUserId(userId, checkoutInfo);

    if (!createdCheckout) {
      errorCatcher({
        message: "Checkout is not created"
      });
      return;
    }

    const createdCheckoutItems = await createCheckoutItems(
      createdCheckout.id,
      checkoutInfo.providersIds
    );

    if (!createdCheckoutItems) {
      errorCatcher({
        message: "Providers are not connected to the checkout"
      });
      return;
    }

    const createdCheckoutInfo = await getCheckoutById(createdCheckout.id);

    if (!createdCheckoutInfo) {
      errorCatcher({
        message: "Checkout is not founded"
      });
      return;
    }

    next(
      responseCatcher<BillingAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: createdCheckoutInfo,
          message: "Created checkout"
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
