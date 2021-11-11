import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import responseMiddleware from "message-catcher";
import Joi from "joi";
import { validate } from "express-validation";

import { errorCatcher } from "@helpers/error-catcher";


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers["x-access-token"] as string;

    if (!token) {
      errorCatcher({
        responseCode: responseMiddleware.RESPONSE_CODES.P_ERROR__UNAUTHORIZED,
        message: "A token is required for authentication"
      });
      return;
    }


    res.locals.user = jwt.verify(token, process.env.JWT_S || "no-jwt-secret-provided");
    next();
  } catch (error) {
    next({
      responseCode: responseMiddleware.RESPONSE_CODES.P_ERROR__FORBIDDEN,
      message: error
    });
  }
};

const registerUserValidation = {
  body: Joi.object({
    email: Joi.string().normalize().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().max(15),
    type: Joi.string()
  })
};

const loginUserValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    type: Joi.string()
  })
};

export const authMiddleware = {
  verifyToken: verifyToken,
  registerUserValidation: validate(
    registerUserValidation,
    {},
    {}
  ),
  loginUserValidation: validate(loginUserValidation, {}, {})
};
