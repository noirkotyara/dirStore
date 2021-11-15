import "module-alias/register";
import responseMiddleware from "message-catcher";
import express, { Request, Response } from "express";

import { testConnectionToDB } from "@helpers/connect-db";

import authRouter from "./routes";

require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (request: Request, response: Response) => {
  response.send("<h2>Welcome to the dirStore admin panel</h2>");
});

app.use(responseMiddleware.sendResponse);

const start = () => {
  try {
    testConnectionToDB();
    app.listen(process.env.PORT);
    console.log(
      "SERVER: Connection is established successfully on port " +
      process.env.PORT
    );
  } catch (error) {
    console.log("SERVER: Oops it is a server Error:" + JSON.stringify(error));
    process.exit(1);
  }
};

start();
