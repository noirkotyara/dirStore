import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";
import { responseCatcher } from "@helpers/response-catcher";
import { errorCatcher } from "@helpers/error-catcher";
import { getCheckoutById } from "@services/checkout/get-checkout-by-id";
import { CheckoutAttributes } from "@types-internal/checkout/checkout-attributes";

export const getCheckoutInfo = async (
  checkoutId: string,
  next: NextFunction
) => {
  try {
    const checkoutInfo = await getCheckoutById(checkoutId);

    if (!checkoutInfo) {
      errorCatcher({
        message: "Checkout info is not founded"
      });
      return;
    }

    next(
      responseCatcher<CheckoutAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: checkoutInfo,
          message: "Checkout is here"
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
