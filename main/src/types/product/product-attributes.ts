import { Optional } from "sequelize";
import { ProductCategory } from "@enums/product-category";

export interface ProductAttributes {
  id?: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes,
    "id" | "description" | "price" | "amount" | "createdAt" | "updatedAt"> {
}
