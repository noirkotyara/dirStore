import { NextFunction } from "express";

// @ts-ignore
import { RESPONSE_CODES } from "message-catcher";

import { UserAttributes } from "../../types/User";

import { createUser } from "../../services/auth/createUser";

import { redisClient } from "../../services/connect-redisTS";

export const register = async (
  userCredentials: UserAttributes,
  next: NextFunction
) => {
  try {
    const createdUser = await createUser(userCredentials);

    const preparedUser = Object.assign({}, createdUser.get());

    delete preparedUser.password;

    redisClient.set("userType:" + preparedUser.id, preparedUser.type);

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: preparedUser,
        message:
          userCredentials.type + " is registered " + userCredentials.email,
      },
    });
  } catch (error) {
    next({
      responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
      data: error,
    });
  }
};
