import type { Response, Request } from "express";
import * as TaskService from "../services/task.service";

// GET Task Given userId
export const getTasks = async (request: any, response: Response) => {
  console.log(request.token);
  const id: number = parseInt(request.params.id, 10);
  try {
    const tasks = await TaskService.listTaskOnUser();
    return response.status(200).json(tasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
};

export const getTaskById = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.userId, 10);
  try {
    const tasks = await TaskService.getTasks(id);
    return response.status(200).json(tasks);
  } catch (err: any) {
    return response.status(500).json(err.message);
  }
};
