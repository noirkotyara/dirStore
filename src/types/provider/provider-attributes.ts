import { Optional } from "sequelize";

export interface ProviderAttributes {
  id: string;
  productId: string;
  delivererId: string;
}

export interface ProviderCreationAttributes
  extends Optional<ProviderAttributes, "id"> {}
