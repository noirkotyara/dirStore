import { ProductCategory } from "@enums/product-category";

export interface ProductAttributesKnex {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  category: ProductCategory;
  created_date: string;
  updated_date: string;
}