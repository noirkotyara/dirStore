import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";

import { createUser } from "@services/auth/create-user";

import { redisClient } from "@services/connectors/connect-redis";

import { responseCatcher } from "@helpers/response-catcher";

export const register = async (
  userInfo: UserAttributes,
  next: NextFunction
) => {
  try {
    const createdUser = await createUser(userInfo);

    const preparedUser: UserAttributes = Object.assign({}, createdUser);

    delete preparedUser.password;

    redisClient.set("userType:" + preparedUser.id, preparedUser.type);

    next(
      responseCatcher<UserAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: preparedUser,
          message:
            userInfo.type + " is registered " + userInfo.email
        }
      })
    );
  } catch (error) {
    next({
      responseCode: RESPONSE_CODES.DB_ERROR_SEQUELIZE,
      message: error
    });
  }
};
