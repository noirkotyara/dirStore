import { Optional } from "sequelize";

import { IdentifierAttributes } from "./identifier-attributes";

import { UserType } from "@enums/user-type";

export interface UserAttributes {
  id?: string;
  type: UserType;
  username: string;
  email: string;
  password: string;
  phone?: string | null;
  identifier?: IdentifierAttributes & { [key: string]: unknown };
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes,
    "id" | "phone" | "password" | "token" | "createdAt" | "updatedAt"> {
}

export type UserAttributesWithToken = {
  profile: Omit<UserAttributes, "password">
  token: string
}
