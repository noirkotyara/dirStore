import axios from "axios";
import { NextFunction } from "express";
import { RESPONSE_CODES } from "message-catcher";

import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";
import { isAxiosError } from "@types-internal/error/axios-error";
import { AxiosResponse } from "@types-internal/error/axios-response";


export const register = async (
  userInfo: UserAttributes,
  next: NextFunction
) => {
  try {
    const registeredUser = await axios.post<UserAttributes, AxiosResponse<UserAttributes>>("http://localhost:3021/auth/entry/register", userInfo).then(response => response.data.data);

    next(
      responseCatcher<UserAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: registeredUser,
          message:
            userInfo.type + " is registered " + userInfo.email
        }
      })
    );
  } catch (error) {
    if (isAxiosError<null>(error)) {
      next({
        responseCode: error.response.data.errorCode,
        message: error.response.data.message
      });
      return;
    }
    next(error);
  }
};
