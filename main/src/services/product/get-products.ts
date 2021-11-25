import { knexConnection } from "@services/connectors/connect-db-knex";

import { inCamel } from "@controllers/product/helpers/product-case-reformator";

import { ProductAttributes } from "@types-internal/product/product-attributes";
import { FilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { ProductAttributesKnex } from "@types-internal/product/product-attributes-knex";
import { Knex } from "knex";
import { DelivererAttributesKnex } from "@types-internal/deliverer/deliverer-attributes-knex";
import { productFilters } from "@services/product/products-filters-knex";
import { deliverersFiltersKnex } from "@services/deliverer/deliverers-filters-knex";

export const getProducts = async (filters: FilterOptionsReformated): Promise<ProductAttributes[]> => {
  const { product, deliverer, order } = filters;

  const products: ProductAttributesKnex[] = await knexConnection
    .distinct("Product.*")
    .from<ProductAttributesKnex>("Product")
    .leftJoin(
      "Provider", "Provider.product_id", "Product.id"
    )
    .leftJoin(
      "Deliverer", "Provider.deliverer_id", "Deliverer.id"
    ).modify((queryBuilder: Knex.QueryBuilder<ProductAttributesKnex, ProductAttributesKnex[]>) => productFilters(queryBuilder, product))
    .modify((queryBuilder: Knex.QueryBuilder<DelivererAttributesKnex, DelivererAttributesKnex[]>) => deliverersFiltersKnex(queryBuilder, deliverer))
    .modify((queryBuilder) => {
      if (order) {
        queryBuilder.orderBy(order.by, order.direction);
      }
    });
  return products.map(item => inCamel(item));
};
