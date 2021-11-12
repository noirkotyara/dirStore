import { Knex } from "knex";

import { MinMaxFilter } from "@types-internal/filtration/min-max-filter";

export const minMaxQuery = <TRecord, TResult>(columnName: string, filter: MinMaxFilter, queryBuilder: Knex.QueryBuilder<TRecord, TResult>) => {
  if (filter.min && filter.max) {
    queryBuilder.whereBetween(columnName, [filter.min, filter.max]);
    return;
  }

  if (filter.min) {
    queryBuilder.where(columnName, ">=", filter.min);
  }

  if (filter.max) {
    queryBuilder.where(columnName, "<=", filter.max);
  }
};