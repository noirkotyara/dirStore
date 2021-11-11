import { NextFunction } from "express";
import { RESPONSE_CODES } from "message-catcher";

import { responseCatcher } from "@helpers/response-catcher";
import { errorCatcher } from "@helpers/error-catcher";

import { ProviderAttributes } from "@types-internal/provider/provider-attributes";

import { getProviderInfoById } from "@services/provider/get-provider-info-by-id";

export const getProviderInfo = async (
  providerId: string,
  next: NextFunction
) => {
  try {
    const providerInfo = await getProviderInfoById(providerId);

    if (!providerInfo) {
      errorCatcher({
        message: "Provider info is not founded"
      });
      return;
    }

    next(
      responseCatcher<ProviderAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: providerInfo,
          message: "Provider is here"
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
