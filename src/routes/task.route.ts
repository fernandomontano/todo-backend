import express from "express";
import { getTaskById, getTasks, listTasks } from "../controllers/task.controller";
import { tokenValidator } from "../middlewares/auth";

export const taskRouter = express.Router();

taskRouter.get("/", listTasks)

taskRouter.get("/:token", getTasks);

taskRouter.get("/:userId", getTaskById);
