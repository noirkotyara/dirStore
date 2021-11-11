import express, { NextFunction, Request, Response } from "express";

import { profileController } from "@controllers/profile";
import { authMiddleware } from "@middlewares/auth.middleware";


const profileRouter = express.Router();

profileRouter.get(
  "/profile",
  authMiddleware.verifyToken,
  (req, res, next: NextFunction) => {
    profileController.getUserProfile(res.locals.user.userId, next);
  }
);

profileRouter.delete(
  "/profile",
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    profileController.deleteUserProfile(res.locals.user.userId, next);
  }
);

profileRouter.put(
  "/profile",
  authMiddleware.verifyToken,
  (req: Request, res: Response, next: NextFunction) => {
    profileController.updateUserProfile(res.locals.user.userId, req.body, next);
  }
);

export default profileRouter;
