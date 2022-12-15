import express from "express";
import {
  createUser as createUserController,
  deleteUser,
  getSingleUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import validate from "../middlewares/validate";
import { createUser } from "../validations/user.validation";

export const userRouter = express.Router();

// GET: List of Users
userRouter.get("/", getUser);

// GET: A single User by Id
userRouter.get("/:token", getSingleUser);

// POST: Create a user
userRouter.post("/", createUserController);

// PUT: Updating an User
userRouter.put("/:id", updateUser);

// DELETE: User
userRouter.delete("/:id", deleteUser);
