export interface ProductFilterOptions {
  p_name?: string;
  p_description?: string;
  p_createdDateMax?: string;
  p_createdDateMin?: string;
  p_priceMax?: number;
  p_priceMin?: number;
  p_amount?: number;
  p_category?: string[];
}

export interface DelivererFilterOptions {
  d_name?: string;
  d_description?: string;
  d_deliveryPriceMax?: number;
  d_deliveryPriceMin?: number;
}

export interface FilterOptions extends DelivererFilterOptions, ProductFilterOptions {
  id?: string;
  order_by?: string;
  order_direction?: "DESC" | "ASC";
}