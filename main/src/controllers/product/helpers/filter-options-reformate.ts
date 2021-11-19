import { FilterOptions } from "@types-internal/filtration/filtration-options";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { parseIntoArray } from "@helpers/filtration/parse-into-array";

export const reformateFilterOptions = (options: FilterOptions): FilterOptionsReformated => {
  let filters = {
    product: {
      category: options.p_category ?? undefined,
      amount: options.p_amount ?? undefined,
      createdDate: {
        max: options.p_createdDateMax ?? undefined,
        min: options.p_createdDateMin ?? undefined
      },
      description: options.p_description ?? undefined,
      name: options.p_name ?? undefined,
      price: {
        max: options.p_priceMax ?? undefined,
        min: options.p_priceMin ?? undefined

      }
    },
    deliverer: {
      name: options.d_name ?? undefined,
      description: options.d_description ?? undefined,
      deliveryPrice: {
        max: options.d_deliveryPriceMax ?? undefined,
        min: options.d_deliveryPriceMin ?? undefined
      }
    }
  };

  if (options.order_by) {
    const orderFilter = { order: { by: options.order_by, direction: options.order_direction ?? "DESC" } };
    filters = {
      ...filters, ...orderFilter
    };
  }

  if (options.id) {
    const idArray = { id: parseIntoArray(options.id) };
    filters = {
      ...filters,
      ...idArray
    };
  }

  return filters;
};