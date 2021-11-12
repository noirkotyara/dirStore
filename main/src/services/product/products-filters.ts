import { Knex } from "knex";

import { ProductFilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { ProductAttributesKnex } from "@types-internal/product/product-attributes-knex";

import { parseIntoArray } from "@helpers/filtration/parse-into-array";
import { minMaxQuery } from "@helpers/filtration/min-max-query";
import { likeQuery } from "@helpers/filtration/like-query";

export const productFilters = (queryBuilder: Knex.QueryBuilder<ProductAttributesKnex, ProductAttributesKnex[]>, product: ProductFilterOptionsReformated) => {
  const { createdDate, price, amount, category, ...otherProductFilters } = product;

  if (category) {
    queryBuilder.whereIn("Product.category", parseIntoArray(category));
  }

  if (amount) {
    queryBuilder.where("Product.amount", ">=", amount);
  }

  if (otherProductFilters) {
    likeQuery<ProductAttributesKnex, ProductAttributesKnex[]>("Product", otherProductFilters, queryBuilder);
  }

  minMaxQuery<ProductAttributesKnex, ProductAttributesKnex[]>("Product.price", price, queryBuilder);
  minMaxQuery<ProductAttributesKnex, ProductAttributesKnex[]>("Product.created_date", createdDate, queryBuilder);
};

