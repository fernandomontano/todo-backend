import { db } from "../utils/db.server";
import { User } from "@prisma/client";

export const listUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      token: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUser = async (token: string): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
      name: true,
      email: true,
      token: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const { name, email, token } = user;
  return db.user.create({
    data: {
      name,
      email,
      token,
    },
    select: {
      id: true,
      name: true,
      email: true,
      token: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUser = async (
  user: Omit<User, "id">,
  id: number
): Promise<User> => {
  const { name, email, token } = user;
  return db.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      token,
    },
    select: {
      id: true,
      name: true,
      email: true,
      token: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (id: number): Promise<void> => {
  await db.user.delete({
    where: {
      id,
    },
  });
};
