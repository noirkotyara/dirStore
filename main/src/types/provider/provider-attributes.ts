import { Optional } from "sequelize";
import { DelivererAttributes } from "@types-internal/deliverer/deliverer-attributes";
import { ProductAttributes } from "@types-internal/product/product-attributes";

export interface ProviderAttributes {
  id: string;
  productId: string;
  delivererId: string;
  deliverer: DelivererAttributes;
  product: ProductAttributes;
}

export interface ProviderCreationAttributes
  extends Optional<ProviderAttributes, "id" | "deliverer" | "product"> {}
