import { User } from "@prisma/client";
import { db } from "../utils/db.server";

type Task = {
  description: string;
  taskStateId: number;
  user: User;
};

export const listTasks = async (): Promise<Task[]> => {
  return db.task.findMany({
    select: {
      description: true,
      taskStateId: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          token: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
};

export const listTaskOnUser = async (id: number): Promise<Task[] | null> => {
  return db.task.findMany({
    where: {
      userId: id,
    },
    select: {
      description: true,
      taskStateId: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          token: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
};

export const getTasks = async (token: string): Promise<Task[] | null> => {
  return db.task.findMany({
    where: {
      user: {
        token,
      },
    },
    select: {
      description: true,
      taskStateId: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          token: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
};

export const createTask = async (task: Task, id: number): Promise<Task> => {
  const { description, taskStateId } = task;
  return db.task.create({
    data: { description, taskStateId, userId: id },
    select: {
      description: true,
      taskStateId: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          token: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
};

// export const updateTasks = async (task: Omit<Task, "userId">)
