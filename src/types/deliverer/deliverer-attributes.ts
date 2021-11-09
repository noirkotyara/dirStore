import { Optional } from "sequelize";

export interface DelivererAttributes {
  id?: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  deliveryPrice: number;
}

export interface DelivererCreationAttributes
  extends Optional<
    DelivererAttributes,
    "id" | "description" | "address" | "deliveryPrice"
  > {}
