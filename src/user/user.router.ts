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

// GET: A single User by Id
userRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const user = await UserService.getUser(id);
    return user
      ? response.status(200).json(user)
      : response.status(404).json("Not found");
  } catch (error: any) {
    return;
  }
});
