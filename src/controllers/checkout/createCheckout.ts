import { NextFunction } from "express";

// @ts-ignore
import { RESPONSE_CODES } from "message-catcher";
import { CheckoutType } from "../../types/Checkout";
import { ErrorCatcher } from "../../helpers/ErrorCatcher";
import { ErrorMessageCatcher } from "../../helpers/ErrorMessageCatcher";
import { createCheckoutByUserId } from "../../services/checkout/createCheckoutByUserId";
import { createCheckoutItems } from "../../services/checkout/createCheckoutItems";

export const createCheckout = async (
  userId: string,
  checkoutInfo: CheckoutType,
  next: NextFunction
) => {
  try {
    const createdCheckout = await createCheckoutByUserId(userId, checkoutInfo);

    const checkoutId = createdCheckout.id;

    if (!checkoutId) {
      throw new ErrorMessageCatcher("Checkout is not created");
    }

    const createdCheckoutItems = await createCheckoutItems(
      checkoutId,
      checkoutInfo.providersIds
    );

    if (!createdCheckoutItems) {
      throw new ErrorMessageCatcher(
        "Providers are not connected to the checkout"
      );
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: createdCheckoutItems,
        message: "Created checkout",
      },
    });
  } catch (error: any) {
    if (error instanceof ErrorCatcher || error instanceof ErrorMessageCatcher) {
      return next(error);
    }
    next({
      responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
      data: error,
    });
  }
};
