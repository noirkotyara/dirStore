import express from "express";

import entryRouter from "./entry.routes";
import profileRouter from "./profile.routes";

const authRouter = express.Router();

authRouter.use("/profile", profileRouter);
authRouter.use("/entry", entryRouter);

export default authRouter;
