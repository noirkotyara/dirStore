import { Knex } from "knex";

import { DelivererFilterOptionsReformated } from "@types-internal/filtration/filtration-options-reformated";
import { DelivererAttributesKnex } from "@types-internal/deliverer/deliverer-attributes-knex";

import { minMaxQuery } from "@helpers/filtration/min-max-query";
import { likeQuery } from "@helpers/filtration/like-query";


export const deliverersFilters = (queryBuilder: Knex.QueryBuilder<DelivererAttributesKnex, DelivererAttributesKnex[]>, deliverer: DelivererFilterOptionsReformated) => {
  const { deliveryPrice, ...otherDelivererFilters } = deliverer;

  if (otherDelivererFilters) {
    likeQuery<DelivererAttributesKnex, DelivererAttributesKnex[]>("Deliverer", otherDelivererFilters, queryBuilder);
  }

  minMaxQuery<DelivererAttributesKnex, DelivererAttributesKnex[]>("Deliverer.delivery_price", deliveryPrice, queryBuilder);
};

