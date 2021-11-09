import { DataTypes, ModelDefined, UUIDV4 } from "sequelize";

import { seqConnection } from "@services/connectors/connect-db-sequelize";

import { CheckoutModel } from "./checkout.model";
import ProviderModel from "@models/provider.model";

import {
  CheckoutItemAttributes,
  CheckoutItemCreationAttributes,
} from "@types-internal/checkout-item/checkout-item-attributes";

export const CheckoutItemModel: ModelDefined<
  CheckoutItemAttributes,
  CheckoutItemCreationAttributes
> = seqConnection.define(
  "Checkout_Item",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: UUIDV4,
    },
    providerId: {
      type: DataTypes.STRING(35),
      field: "provider_id",
    },
    checkoutId: {
      type: DataTypes.STRING(35),
      field: "checkout_id",
    },
    createdAt: {
      field: "created_date",
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: "updated_date",
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Checkout_Item",
    timestamps: true,
  }
);

ProviderModel.belongsToMany(CheckoutModel, {
  through: CheckoutItemModel,
  as: "checkouts",
  foreignKey: "provider_id",
});

CheckoutModel.belongsToMany(ProviderModel, {
  through: CheckoutItemModel,
  as: "providers",
  foreignKey: "checkout_id",
});

CheckoutItemModel.belongsTo(CheckoutModel, {
  foreignKey: "checkout_id",
  as: "checkout",
});
CheckoutItemModel.belongsTo(ProviderModel, {
  foreignKey: "provider_id",
  as: "provider",
});
