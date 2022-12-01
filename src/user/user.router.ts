import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import * as UserService from "./user.services";

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

// POST: Create a Author
// Params: name, email, token
userRouter.post(
  "/",
  body("name").isString(),
  body("email").isString(),
  body("token").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array });
    }
    try {
      const user = request.body;
      const newUser = await UserService.createUser(user);
      return response.status(201).json(newUser);
    } catch (error: any) {
      return;
    }
  }
);

// PUT: Updating an Author
// Params: name, email
userRouter.put(
  "/:id",
  body("name").isString(),
  body("email").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array });
    }
    const id: number = parseInt(request.params.id, 10);
    try {
      const user = request.body;
      const updatedUser = await UserService.updateUser(user, id);
      return response.status(200).json(updatedUser);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

userRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await UserService.deleteUser(id);
    return response.status(204).json("User deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
