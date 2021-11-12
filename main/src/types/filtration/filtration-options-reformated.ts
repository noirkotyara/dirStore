import { GeneralFilterType } from "@types-internal/filtration/general-filter";
import { MinMaxFormat } from "@types-internal/filtration/min-max-filter";

export interface ProductFilterOptionsReformated extends GeneralFilterType {
  name?: string;
  description?: string;
  createdDate: MinMaxFormat<string>;
  price: MinMaxFormat<number>;
  amount?: number;
  category?: string;
}

export interface DelivererFilterOptionsReformated extends GeneralFilterType {
  name?: string;
  description?: string;
  deliveryPrice: MinMaxFormat<number>;
}

export interface FilterOptionsReformated {
  product: ProductFilterOptionsReformated;
  deliverer: DelivererFilterOptionsReformated;
  order?: OrderFilterOptionReformated;
}

export interface OrderFilterOptionReformated {
  by: string,
  direction: "DESC" | "ASC"
}
