import express from "express";
import type { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import * as TaskService from "./task.services";

export const taskRouter = express.Router();

// GET Task Given userId
taskRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const tasks = await TaskService.listTaskOnUser(id);
    return response.status(200).json(tasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
});

// PUT (Update) Task Given TaskId
taskRouter.put(
  "/:userId",
  body("description").isString(),
  body("taskStateId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array });
    }
    const id: number = parseInt(request.params.userId, 10);
    try {
      const task = request.body;
      const updatedTask = await TaskService.updateTask(task, id);
      return response.status(200).json(updatedTask);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// CREATE Task
taskRouter.post(
  "/",
  body("description").isString(),
  body("taskStateId").isNumeric(),
  body("userId").isNumeric(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array });
    }
    try {
      const task = request.body;
      const newTask = await TaskService.createTask(task);
      return response.status(201).json(newTask);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
