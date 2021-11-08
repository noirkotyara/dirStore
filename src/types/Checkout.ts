import { Optional } from "sequelize";

export interface CheckoutAttributes {
  id?: string;
  userId: string;
  status?: CheckoutStatus;
  invoice?: string;
}

export enum CheckoutStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  IN_PROGRESS = "IN_PROGRESS",
  ARRIVED = "ARRIVED",
  DECLINED = "DECLINED",
  RETURNED = "RETURNED",
  FULLFILLED = "FULLFILLED",
}

export type CheckoutType = {
  providersIds: string[];
};

export interface CheckoutCreationAttributes
  extends Optional<CheckoutAttributes, "id" | "invoice"> {}
