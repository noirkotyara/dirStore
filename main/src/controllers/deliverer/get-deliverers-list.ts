import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";

import { responseCatcher } from "@helpers/response-catcher";

import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";

import { getDeliverers } from "@services/deliverer/get-deliverers";
import { DelivererAttributes, DelivererCreationAttributes } from "@types-internal/deliverer/deliverer-attributes";
import { Model } from "sequelize";

export const getDelivererList = async (filterOptions: FilterOptionsReformated, next: NextFunction) => {
  try {
    console.log("filters", filterOptions);
    const deliverersList = await getDeliverers(filterOptions);

    next(
      responseCatcher<{ rows: Model<DelivererAttributes, DelivererCreationAttributes>[], count: number }>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: deliverersList,
          message: "Deliverers"
        }
      })
    );

  } catch (error) {
    next(error);
  }
};