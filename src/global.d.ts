declare module "@models/provider.model" {
  import { ModelDefined } from "sequelize";
  import {
    ProviderAttributes,
    ProviderCreationAttributes,
  } from "@types-internal/provider/provider-attributes";
  const ProviderModel: ModelDefined<
    ProviderAttributes,
    ProviderCreationAttributes
  >;
  export = ProviderModel;
}

declare module "@models/deliverer.model" {
  import { ModelDefined } from "sequelize";
  import {
    DelivererAttributes,
    DelivererCreationAttributes,
  } from "@types-internal/deliverer/deliverer-attributes";
  const DelivererModel: ModelDefined<
    DelivererAttributes,
    DelivererCreationAttributes
  >;
  export = DelivererModel;
}

declare module "@models/product.model" {
  import { ModelDefined } from "sequelize";
  import {
    ProductAttributes,
    ProductCreationAttributes,
  } from "@types-internal/product/product-attributes";
  const ProductModel: ModelDefined<
    ProductAttributes,
    ProductCreationAttributes
  >;
  export = ProductModel;
}
