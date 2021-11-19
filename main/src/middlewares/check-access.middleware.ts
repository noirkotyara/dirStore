import { NextFunction } from "express";
import axios from "axios";
import { RESPONSE_CODES } from "message-catcher";
import * as util from "util";


import { redisClient } from "@services/connectors/connect-redis";
import { UserAttributes } from "@types-internal/user/user-attributes";
import { AxiosResponse } from "@types-internal/error/axios-response";

const redisGet = util.promisify(redisClient.get).bind(redisClient);


export const checkAccessMiddleware = async (req: { originalUrl: string, method: string, user: { userId: string }, headers: { "x-access-token": string } }, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const routerType = req.originalUrl.split("/")[1].toUpperCase();
  let requesterType = "";

  try {
    const userType = await redisGet("userType:" + req.user.userId);

    if (userType) {
      requesterType = userType.toString();
// TODO: DRY
      if (routerType !== requesterType) {
        return next({
          responseCode: RESPONSE_CODES.P_ERROR__FORBIDDEN,
          message: requesterType + " do not have access"
        });
      }
      next();
      return;
    }

    const userProfile = await axios.get<UserAttributes, AxiosResponse<UserAttributes>>("http://localhost:3021/auth/profile", {
      headers: {
        "x-access-token": req.headers["x-access-token"]
      }
    }).then(response => response.data.data);

    if (userProfile) {
      requesterType = userProfile.type;
      redisClient.set("userType:" + req.user.userId, userProfile.type);
    }
// TODO: DRY
    if (routerType !== requesterType) {
      return next({
        responseCode: RESPONSE_CODES.P_ERROR__FORBIDDEN,
        message: requesterType + " do not have access"
      });
    }

  } catch (error) {
    if (error) {
      return next({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: error
      });
    }
    next();
  }
};
