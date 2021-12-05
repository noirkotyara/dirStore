import { Optional } from "sequelize";

export interface ShippingAttributes {
  id: string;
  checkoutId: string;
  fullName: string;
  country: number;
  streetAddress: string;
  stateProvinceRegion: string;
  city: string;
  postCode: string;
  emailAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingCreationAttributes
  extends Optional<ShippingAttributes, "id" | "createdAt" | "updatedAt"> {
}
