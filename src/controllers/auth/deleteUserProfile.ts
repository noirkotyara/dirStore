import * as util from "util";
import { NextFunction } from "express";

// @ts-ignore
import { RESPONSE_CODES } from "message-catcher";

import { findUserProfileById } from "../../services/auth/findUserProfileById";
import { deleteUserProfileById } from "../../services/auth/deleteUserProfileById";

import { redisClient } from "../../services/connectors/connect-redis";
import { ErrorMessageCatcher } from "../../helpers/ErrorMessageCatcher";
import { ErrorCatcher } from "../../helpers/ErrorCatcher";

const redisGet = util.promisify(redisClient.get).bind(redisClient);

export const deleteUserProfile = async (userId: string, next: NextFunction) => {
  try {
    let userProfile;
    const userProfileRedis = await redisGet("userProfile:" + userId);

    if (userProfileRedis) {
      userProfile = JSON.parse(userProfileRedis);
    }

    if (!userProfile) {
      userProfile = await findUserProfileById(userId);
    }

    if (!userProfile) {
      throw new ErrorCatcher({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        data: "User is not existed",
      });
    }

    const deletedRows = await deleteUserProfileById(userId);

    const isUserDeleted = deletedRows !== 0;

    if (!isUserDeleted) {
      throw new ErrorMessageCatcher("User is not deleted");
    }

    const deletedRowsUserProfileRedis = redisClient.del(
      "userProfile:" + userId
    );
    const deletedRowsUserTypeRedis = redisClient.del("userType:" + userId);

    if (!deletedRowsUserProfileRedis || !deletedRowsUserTypeRedis) {
      throw new ErrorMessageCatcher("User cash is not empty");
    }

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: userProfile,
        message: "User profile was deleted",
      },
    });
  } catch (error) {
    next(error);
  }
};
