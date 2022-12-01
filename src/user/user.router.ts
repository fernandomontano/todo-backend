import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as UserService from "./user.service";

export const userRouter = express.Router();

// GET: List of Users
userRouter.get("/", async (request: Request, response: Response) => {
  try {
    const users = await UserService.listUsers();
    return response.status(200).json(users);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
