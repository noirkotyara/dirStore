import { DataTypes, ModelDefined } from "sequelize";

import { seqConnection } from "@services/connectors/connect-db-sequelize";

import { ImageAttributes, ImageCreationAttributes } from "@types-internal/checkout/image-attributes";

import ProductModel from "@models/product.model";

export const ImageModel: ModelDefined<ImageAttributes,
  ImageCreationAttributes> = seqConnection.define(
  "Image",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      field: "created_date",
      type: DataTypes.DATE
    },
    updatedAt: {
      field: "updated_date",
      type: DataTypes.DATE
    }
  },
  {
    tableName: "Image",
    timestamps: true
  }
);

ImageModel.belongsToMany(ProductModel, { through: "Product_Image", as: "images" });
ProductModel.belongsToMany(ImageModel, { through: "Product_Image", as: "products" });