import { db } from "../utils/db.server";

type User = {
  id: number;
  name: string;
  email: string;
  token: string;
  createdAt: Date;
};

export const listUsers = async (): Promise<User[]> => {
  return db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      token: true,
      createdAt: true,
    },
  });
};
