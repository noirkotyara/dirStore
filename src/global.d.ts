declare module "*provider.model" {
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
