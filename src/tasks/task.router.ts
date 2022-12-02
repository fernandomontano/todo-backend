import express from "express";
import type { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import * as TaskService from "./task.services";

export const taskRouter = express.Router();

// GET Task Given userId
taskRouter.get("/", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const tasks = await TaskService.listTaskOnUser();
    return response.status(200).json(tasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
});

taskRouter.get("/:userId", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.userId, 10);
  try {
    const tasks = await TaskService.getTasks(id);
    return response.status(200).json(tasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
});
