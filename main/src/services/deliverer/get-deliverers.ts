import { Model } from "sequelize";

import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { DelivererAttributes, DelivererCreationAttributes } from "@types-internal/deliverer/deliverer-attributes";

import { likeOperator } from "@helpers/filtration/sequelize/like-operator";
import { minMaxOperator } from "@helpers/filtration/sequelize/min-max-operator";
import { greaterThanOperator } from "@helpers/filtration/sequelize/greater-than-operator";
import { inOperator } from "@helpers/filtration/sequelize/in-operator";

import DelivererModel from "@models/deliverer.model";
import ProductModel from "@models/product.model";

export const getDeliverers = async (filters: FilterOptionsReformated): Promise<{ rows: Model<DelivererAttributes, DelivererCreationAttributes>[], count: number }> => {
  const { product, deliverer, order } = filters;

  return await DelivererModel.findAndCountAll({
    where: {
      ...likeOperator("name", deliverer.name),
      ...likeOperator("description", deliverer.description),
      ...minMaxOperator("deliveryPrice", deliverer.deliveryPrice)
    },
    include: [
      {
        model: ProductModel,
        as: "products",
        attributes: [],
        where: {
          ...likeOperator("name", product.name),
          ...likeOperator("description", product.description),
          ...minMaxOperator("price", product.price),
          ...minMaxOperator("createdDate", product.createdDate),
          ...greaterThanOperator("amount", product.amount),
          ...inOperator("category", product.category)
        }
      }
    ],
    ...(order?.by && { order: [[order.by, order.direction ?? "DESC"]] })
  });
};

