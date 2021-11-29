import { Optional } from "sequelize";

export interface ImageAttributes {
  id: string;
}

export interface ImageCreationAttributes
  extends Optional<ImageAttributes, "id"> {
}
