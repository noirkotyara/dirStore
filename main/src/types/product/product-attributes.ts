import { Optional } from "sequelize";

export interface ProductAttributes {
  id?: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    "id" | "description" | "price" | "amount" | "createdAt" | "updatedAt"
  > {}
