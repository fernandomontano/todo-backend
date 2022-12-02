import type { Request, Response } from "express";
import * as UserService from "../services/user.service";

export const getUser = async (request: Request, response: Response) => {
  try {
    const users = await UserService.listUsers();
    response.send(users);
  } catch (error: any) {
    response.status(500).json(error.message);
  }
};

export const getSingleUser = async (request: Request, response: Response) => {
  const token: string = request.params.token;
  try {
    const user = await UserService.getUser(token);
    return user
      ? response.status(200).json(user)
      : response.status(404).json("Not found");
  } catch (error: any) {
    return;
  }
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const user = request.body;
    const newUser = await UserService.createUser(user);
    return response.status(201).json(newUser);
  } catch (error: any) {
    return;
  }
};

export const updateUser = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const user = request.body;
    const updatedUser = await UserService.updateUser(user, id);
    return response.status(200).json(updatedUser);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const deleteUser = async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await UserService.deleteUser(id);
    return response.status(204).json("User deleted");
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};
