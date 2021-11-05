import * as util from "util";
import { NextFunction } from "express";

// @ts-ignore
import { RESPONSE_CODES } from "message-catcher";

import { redisClient } from "../../services/connect-redis";
import { updateUserProfileById } from "../../services/auth/updateUserProfileById";

import { UserAttributes } from "../../types/User";
import { findUserProfileById } from "../../services/auth/findUserProfileById";

const redisSetex = util.promisify(redisClient.setex).bind(redisClient);

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

    console.log("CHANGED", isUserUpdated);

    if (!isUserUpdated) {
      throw new Error("User is not updated");
    }

    const updatedUserProfile = await findUserProfileById(userId);

    await redisSetex(
      "userProfile:" + userId,
      30,
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
    next({
      responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
      data: error,
    });
  }
};
