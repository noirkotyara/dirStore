import * as util from "util";

import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";

import { findUserProfileById } from "@services/auth/find-user-profile-by-id";
import { deleteUserProfileById } from "@services/auth/delete-user-profile-by-id";

import { redisClient } from "@services/connectors/connect-redis";

import { errorCatcher } from "@helpers/error-catcher";
import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";

const redisGet = util.promisify(redisClient.get).bind(redisClient);

export const deleteUserProfile = async (userId: string, next: NextFunction) => {
  try {
    let userProfile: UserAttributes | null = null;
    const userProfileRedis = await redisGet("userProfile:" + userId);

    if (userProfileRedis) {
      userProfile = JSON.parse(userProfileRedis);
    }

    if (!userProfile) {
      userProfile = await findUserProfileById(userId);
    }

    if (!userProfile) {
      errorCatcher({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "User is not existed"
      });
      return;
    }

    const isUserDeleted = await deleteUserProfileById(userId);

    if (!isUserDeleted) {
      errorCatcher({
        message: "User is not deleted"
      });
      return;
    }

    const deletedRowsUserProfileRedis = redisClient.del(
      "userProfile:" + userId
    );
    const deletedRowsUserTypeRedis = redisClient.del("userType:" + userId);

    if (!deletedRowsUserProfileRedis || !deletedRowsUserTypeRedis) {
      errorCatcher({
        message: "User cash is not empty"
      });
      return;
    }

    next(
      responseCatcher<UserAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: userProfile,
          message: "User profile was deleted"
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
