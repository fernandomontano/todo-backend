import type { Response, Request } from "express";
import * as TaskService from "../services/task.service";

export const listTasks = async (request: Request, response: Response) => {
  try {
    const tasks = await TaskService.listTasks();
    response.send(tasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
};

// GET Task Given userId
export const getTasks = async (request: any, response: Response) => {
  const token: string = request.params.token;
  try {
    const tasks = await TaskService.getTasks(token);
    return response.status(200).json(tasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
};

export const getTaskById = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const tasks = await TaskService.listTaskOnUser(id);
    return response.status(200).json(tasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
};

export const createTask = async (request: Request, response: Response) => {
  const task = request.body;
  const userId: number = parseInt(request.params.id, 10);
  try {
    const newTasks = await TaskService.createTask(task, userId);
    response.status(201).json(newTasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
};
