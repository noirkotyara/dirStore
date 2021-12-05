import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";
import { responseCatcher } from "@helpers/response-catcher";
import { errorCatcher } from "@helpers/error-catcher";
import { BillingAttributes } from "@types-internal/checkout/billing-attributes";
import { getCheckoutsByUserId } from "@services/checkout/get-checkouts-by-user-id";

export const getUserCheckouts = async (userId: string, next: NextFunction) => {
  try {
    const checkoutList = await getCheckoutsByUserId(userId);

    if (!checkoutList) {
      errorCatcher({
        message: "Checkout list is not founded"
      });
      return;
    }

    next(
      responseCatcher<BillingAttributes[]>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: checkoutList,
          message: "Checkout is here"
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
