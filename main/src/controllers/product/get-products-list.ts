import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";

import { responseCatcher } from "@helpers/response-catcher";

import { getProducts } from "@services/product/get-products";

import { ProductAttributes } from "@types-internal/product/product-attributes";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";

export const getProductsList = async (filterOptions: FilterOptionsReformated, next: NextFunction) => {
  try {
    const productsList = await getProducts(filterOptions);

    next(
      responseCatcher<ProductAttributes[]>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: productsList,
          message: "Products"
        }
      })
    );

  } catch (error) {
    next(error);
  }
};
