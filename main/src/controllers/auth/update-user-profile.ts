import { NextFunction } from "express";
import axios from "axios";
import { RESPONSE_CODES } from "message-catcher";

import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";
import { AxiosResponse } from "@types-internal/error/axios-response";

export const updateUserProfile = async (
  userId: string,
  userProfileFieldsToChange: UserAttributes,
  token: string,
  next: NextFunction
) => {
  try {
    const userProfile = await axios.put<UserAttributes, AxiosResponse<UserAttributes>, UserAttributes>("http://localhost:3021/auth/profile", userProfileFieldsToChange, {
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
            `${userProfile.type} profile ${userProfile.email} is updated successfully`
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
