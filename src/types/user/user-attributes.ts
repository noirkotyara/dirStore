import { Optional } from "sequelize";

import { IdentifierAttributes } from "./identifier-attributes";

import { UserType } from "@enums/user-type";

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
