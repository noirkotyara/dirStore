import express, { NextFunction, Request, Response } from "express";

import { entryController } from "@controllers/entry";


const entryRouter = express.Router();

entryRouter.post(
  "/register",
  (req: Request, res: Response, next: NextFunction) => {
    entryController.register(req.body, next);
  }
);

entryRouter.post("/login", (req: Request, res: Response, next: NextFunction): void => {
  entryController.login(req.body, next);
});

export default entryRouter;
