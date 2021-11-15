import { knexConnection } from "@services/connectors/connect-db-knex";
import { productFilters } from "@services/product/products-filters-knex";

import { inCamel } from "@controllers/product/helpers/product-case-reformator";

import { ProductAttributes } from "@types-internal/product/product-attributes";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { ProductAttributesKnex } from "@types-internal/product/product-attributes-knex";

import { Knex } from "knex";
import { deliverersFiltersKnex } from "@services/deliverer/deliverers-filters-knex";
import { DelivererAttributesKnex } from "@types-internal/deliverer/deliverer-attributes-knex";

export const getProducts = async (filters: FilterOptionsReformated): Promise<ProductAttributes[]> => {
  const { product, deliverer, order } = filters;

  const products: ProductAttributesKnex[] = await knexConnection
    .select("Product.*")
    .from<ProductAttributesKnex>("Product")
    .join(
      "Provider", "Provider.product_id", "Product.id"
    )
    .join(
      "Deliverer", "Deliverer.id", "Provider.deliverer_id"
    )
    .modify((queryBuilder: Knex.QueryBuilder<ProductAttributesKnex, ProductAttributesKnex[]>) => productFilters(queryBuilder, product))
    .modify((queryBuilder: Knex.QueryBuilder<DelivererAttributesKnex, DelivererAttributesKnex[]>) => deliverersFiltersKnex(queryBuilder, deliverer))
    .modify((queryBuilder) => {
      if (order) {
        queryBuilder.orderBy(order.by, order.direction);
      }
    });

  return products.map(item => inCamel(item));
};
