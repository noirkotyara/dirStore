import { Optional } from "sequelize";
import { UserType } from "../../enums/user-type";
import { IdentifierAttributes } from "./identifier-attributes";

export interface UserAttributes {
  id?: string;
  type: UserType;
  username: string;
  email: string;
  password?: string;
  phone?: string | null;
  identifier?: IdentifierAttributes;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "phone" | "password" | "createdAt" | "updatedAt"
  > {}
