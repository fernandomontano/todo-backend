import { User } from "@prisma/client";
import { db } from "../utils/db.server";

type Task = {
  description: string;
  taskStateId: number;
  user: User;
};

export const listTaskOnUser = async (): Promise<Task[] | null> => {
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

export const getTasks = async (userId: number): Promise<Task[] | null> => {
  return db.task.findMany({
    where: {
      user: {
        id: userId,
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
