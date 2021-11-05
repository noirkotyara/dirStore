import { Optional } from "sequelize";

export interface Identifier {
  firstName?: string;
  lastName?: string;
  code?: number;
  publisher?: string;
}

export enum UserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface UserAttributes {
  id?: string;
  type: UserType;
  username: string;
  email: string;
  password?: string;
  phone?: string | null;
  identifier?: Identifier;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "phone" | "password" | "createdAt" | "updatedAt"
  > {}
