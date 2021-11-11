import { NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RESPONSE_CODES } from "message-catcher";

import { UserCredentials } from "@types-internal/user/user-credentials";

import { findUserByEmail } from "@services/auth/find-user-by-email";

import { errorCatcher } from "@helpers/error-catcher";
import { responseCatcher } from "@helpers/response-catcher";

import { UserAttributesWithToken } from "@types-internal/user/user-attributes";

export const login = async (userCredentials: UserCredentials, next: NextFunction) => {
  try {
    const foundedUser = await findUserByEmail(userCredentials.email);

    if (!foundedUser) {
      next(errorCatcher({
        responseCode: RESPONSE_CODES.P_ERROR__NOT_FOUND,
        message: "User is not founded"
      }));
      return;
    }

    const { password, ...userProfile } = foundedUser;

    const isPasswordValid = await bcrypt.compare(userCredentials.password, password);

    if (!isPasswordValid) {
      next(errorCatcher({
        responseCode: RESPONSE_CODES.P_ERROR__FORBIDDEN,
        message: "Email or password is incorrect"
      }));
      return;
    }

    const userToken = jwt.sign(
      {
        userId: userProfile.id
      },
      process.env.JWT_S || "no-jwt-provided",
      {
        expiresIn: "1h"
      }
    );

    next(responseCatcher<UserAttributesWithToken>({
        responseCode: RESPONSE_CODES.SUCCESS__CREATED,
        data: {
          data: { profile: userProfile, token: userToken },
          message: "Login is successful for " + userCredentials.email
        }
      })
    );

  } catch (error) {
    next(error);
  }
};
