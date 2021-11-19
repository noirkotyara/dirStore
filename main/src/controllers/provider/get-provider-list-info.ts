import { NextFunction } from "express";
import { RESPONSE_CODES } from "message-catcher";

import { responseCatcher } from "@helpers/response-catcher";

import { ProviderAttributes } from "@types-internal/provider/provider-attributes";
import { getProviderListInfoByIds } from "@services/provider/get-provider-list-info-by-ids";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { getProviderList } from "@services/provider/get-provider-list";
import { errorCatcher } from "@helpers/error-catcher";

export const getProviderListInfo = async (
  filters: FilterOptionsReformated,
  next: NextFunction
) => {
  try {
    let providersInfo: null | ProviderAttributes[] = [];

    if (!filters.id) {
      providersInfo = await getProviderList();
    } else {
      providersInfo = await getProviderListInfoByIds(filters.id);
    }

    if (!providersInfo) {
      errorCatcher({
        message: "Provider are cannot be founded"
      });
      return;
    }

    next(
      responseCatcher<ProviderAttributes[]>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: providersInfo,
          message: "Provider is here"
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
