import * as util from "util";
import { NextFunction } from "express";

import { RESPONSE_CODES } from "message-catcher";

import { redisClient } from "../../services/connectors/connect-redis";
import { updateUserProfileById } from "../../services/auth/updateUserProfileById";

import { UserAttributes } from "../../types/User";
import { findUserProfileById } from "../../services/auth/findUserProfileById";
import { ErrorMessageCatcher } from "../../helpers/ErrorMessageCatcher";

const redisSetex = util.promisify(redisClient.setex).bind(redisClient);

const EXPIRES_TIME_SEC = 30;

export const updateUserProfile = async (
  userId: string,
  userProfileFieldsToChange: UserAttributes,
  next: NextFunction
) => {
  try {
    const updatedRows = await updateUserProfileById(
      userId,
      userProfileFieldsToChange
    );

    const isUserUpdated = updatedRows?.length && updatedRows[0] !== 0;

    if (!isUserUpdated) {
      throw new ErrorMessageCatcher("User is not updated");
    }

    const updatedUserProfile = await findUserProfileById(userId);

    await redisSetex(
      "userProfile:" + userId,
      EXPIRES_TIME_SEC,
      JSON.stringify(updatedUserProfile)
    );

    next({
      responseCode: RESPONSE_CODES.SUCCESS__CREATED,
      data: {
        data: updatedUserProfile,
        message: "User info is updated",
      },
    });
  } catch (error) {
    next(error);
  }
};
