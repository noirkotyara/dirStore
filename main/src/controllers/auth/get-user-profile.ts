import axios from "axios";
import { NextFunction } from "express";
import { RESPONSE_CODES } from "message-catcher";

import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";
import { AxiosResponse } from "@types-internal/error/axios-response";


export const getUserProfile = async (
  userId: string,
  token: string,
  next: NextFunction
) => {
  try {

    const userProfile = await axios.get<UserAttributes, AxiosResponse<UserAttributes>>("http://localhost:3021/auth/profile", {
      headers: {
        "x-access-token": token
      }
    }).then(response => response.data.data);

    next(
      responseCatcher<UserAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: userProfile,
          message:
            `${userProfile.type} profile`
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
