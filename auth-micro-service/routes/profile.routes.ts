import express, { NextFunction, Request, Response } from "express";

import { profileController } from "@controllers/profile";
import { authMiddleware } from "@middlewares/auth.middleware";


const profileRouter = express.Router();

profileRouter.get(
  "/",
  authMiddleware.verifyToken,
  (req, res, next: NextFunction) => {
    profileController.getUserProfile(res.locals.user.userId, next);
  }
);

profileRouter.delete(
  "/",
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    profileController.deleteUserProfile(res.locals.user.userId, next);
  }
);

profileRouter.put(
  "/",
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    profileController.updateUserProfile(res.locals.user.userId, req.body, next);
  }
);

export default profileRouter;
