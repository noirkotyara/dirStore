import * as util from "util";

import { NextFunction } from "express";
import { RESPONSE_CODES } from "message-catcher";

import { redisClient } from "@services/connectors/connect-redis";
import { findUserProfileById } from "@services/auth/find-user-profile-by-id";

import { errorCatcher } from "@helpers/error-catcher";
import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";

const redisGet = util.promisify(redisClient.get).bind(redisClient);
const redisSetex = util.promisify(redisClient.setex).bind(redisClient);

const EXPIRES_TIME_SEC = 30;

export const getUserProfile = async (userId: string, next: NextFunction) => {
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

    redisSetex(
      "userProfile:" + userId,
      EXPIRES_TIME_SEC,
      JSON.stringify(userProfile)
    );

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


  // var f = ff(
  //   this,
  //   getUserInfoRedis,
  //   checkAndGetAlternateFromDB,
  //   checkAlternateFromDB
  // ).onComplete(onCompleteHandler);
  //
  // function getUserInfoRedis() {
  //   redisClient.get("userProfile:" + userId, f.slotPlain(2));
  // }
  //
  // function checkAndGetAlternateFromDB(error, foundedUser) {
  //   if (error) {
  //     return f.fail({
  //       responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
  //       message: error
  //     });
  //   }
  //
  //   if (!myLodash.isEmpty(foundedUser)) {
  //     return f.succeed(JSON.parse(foundedUser));
  //   }
  //
  //   authService.findUserById(userId, f.slotPlain(2));
  // }
  //
  // function checkAlternateFromDB(error, foundedUserFromDB) {
  //   if (error) {
  //     return f.fail({
  //       responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
  //       message: error
  //     });
  //   }
  //
  //   if (myLodash.isEmpty(foundedUserFromDB)) {
  //     return f.fail({
  //       responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
  //       message: "User is not founded"
  //     });
  //   }
  //
  //   var preparedUserFromDB = myLodash.deepClone(foundedUserFromDB);
  //
  //   delete preparedUserFromDB.password;
  //
  //   redisClient.setex(
  //     "userProfile:" + userId,
  //     30,
  //     JSON.stringify(preparedUserFromDB)
  //   );
  //
  //   f.succeed(preparedUserFromDB);
  // }
  //
  // function onCompleteHandler(error, foundedUser) {
  //   if (error) {
  //     return next(error);
  //   }
  //
  //   next({
  //     responseCode: RESPONSE_CODES.SUCCESS__CREATED,
  //     data: {
  //       data: foundedUser,
  //       message: "User info"
  //     }
  //   });
  // }
};
