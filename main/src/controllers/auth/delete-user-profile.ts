import { NextFunction } from "express";
import axios from "axios";
import { RESPONSE_CODES } from "message-catcher";

import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributes } from "@types-internal/user/user-attributes";
import { AxiosResponse } from "@types-internal/error/axios-response";

export const deleteUserProfile = async (userId: string, token: string, next: NextFunction) => {
  try {

    const deletedUserProfile = await axios.delete<string, AxiosResponse<UserAttributes>>("http://localhost:3021/auth/profile", {
      headers: {
        "x-access-token": token
      }
    }).then(response => response.data.data);

    next(
      responseCatcher<UserAttributes>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: deletedUserProfile,
          message:
            `${deletedUserProfile.username} profile is deleted successfully!`
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
