import express from "express";
import {
  getTaskById,
  getTasks,
  listTasks,
  createTask,
} from "../controllers/task.controller";
import { tokenValidator } from "../middlewares/auth";

export const taskRouter = express.Router();

taskRouter.get("/", listTasks);

// taskRouter.get("/:token", getTasks);

taskRouter.get("/:id", getTaskById);

taskRouter.post("/:id", createTask);
