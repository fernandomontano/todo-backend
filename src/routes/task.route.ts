import express from "express";
import { getTaskById, getTasks } from "../controllers/task.controller";
import { tokenValidator } from "../middlewares/auth";

export const taskRouter = express.Router();

taskRouter.get("/:id", tokenValidator, getTasks);

taskRouter.get("/:userId", getTaskById);
