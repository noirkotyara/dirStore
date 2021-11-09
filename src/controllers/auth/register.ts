import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";

import { UserAttributes } from "../../types/user/user-attributes";

import { createUser } from "@services/auth/create-user";

import { redisClient } from "@services/connectors/connect-redis";
import { responseCatcher } from "@helpers/response-catcher";

export const register = async (
  userCredentials: UserAttributes,
  next: NextFunction
) => {
  try {
    const createdUser = await createUser(userCredentials);

    const preparedUser: UserAttributes = Object.assign({}, createdUser);

    delete preparedUser.password;

    redisClient.set("userType:" + preparedUser.id, preparedUser.type);

    next(
      responseCatcher<UserAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: preparedUser,
          message:
            userCredentials.type + " is registered " + userCredentials.email,
        },
      })
    );
  } catch (error) {
    next({
      responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
      message: error,
    });
  }
};
