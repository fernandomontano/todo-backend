import internal from "stream";
import { db } from "../utils/db.server";

type Task = {
  description: string;
  taskStateId: number;
  userId: number;
};

export const listTaskOnUser = async (id: number): Promise<Task[] | null> => {
  return db.task.findMany({
    where: {
      userId: id,
    },
    select: {
      description: true,
      taskStateId: true,
      userId: true,
    },
  });
};

export const updateTask = async (
  task: Omit<Task, "id">,
  id: number
): Promise<Task> => {
  const { description, taskStateId } = task;
  return db.task.update({
    where: {
      id,
    },
    data: {
      description,
      taskStateId,
    },
    select: {
      description: true,
      taskStateId: true,
      userId: true,
    },
  });
};
