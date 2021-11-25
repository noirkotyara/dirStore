import { MinMaxFilter } from "@types-internal/filtration/min-max-filter";

export type GeneralFilterType = { [key: string]: string | number | undefined | MinMaxFilter | string[] }