import { Knex } from "knex";
import { GeneralFilterType } from "@types-internal/filtration/general-filter";

export const likeQuery = <TRecord, TResult>(tableName: string, filters: GeneralFilterType, queryBuilder: Knex.QueryBuilder<TRecord, TResult>) => {
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryBuilder.where(`${tableName}.${key}`, "like", `%${value}%`);
    }
  });
};