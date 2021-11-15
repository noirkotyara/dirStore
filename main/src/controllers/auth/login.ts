import axios from "axios";
import { NextFunction } from "express";
import { RESPONSE_CODES } from "message-catcher";

import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributesWithToken } from "@types-internal/user/user-attributes";
import { AxiosResponse } from "@types-internal/error/axios-response";
import { UserCredentials } from "@types-internal/user/user-credentials";


export const login = async (
  userCredentials: UserCredentials,
  next: NextFunction
) => {
  try {
    const userProfile = await axios.post<UserCredentials, AxiosResponse<UserAttributesWithToken>>("http://localhost:3021/auth/entry/login", userCredentials).then(response => response.data.data);

    next(
      responseCatcher<UserAttributesWithToken>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: userProfile,
          message:
            `${userProfile.profile.type} with the email ${userProfile.profile.email} was checked in successfully!`
        }
      })
    );
  } catch (error) {
    next(error);
  }
};
