import { db } from "../src/utils/db.server";

type User = {
  name: string;
  email: string;
  token: string;
};

type Task = {
  description: string;
};

type TaskStates = {
  state: string;
};

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: {
          name: user.name,
          email: user.email,
          token: user.token,
        },
      });
    })
  );
  await Promise.all(
    getStates().map((state) => {
      return db.taskStates.create({
        data: {
          state: state.state,
        },
      });
    })
  );

  const user = await db.user.findFirst({
    where: {
      name: "Fernando",
    },
  });

  await Promise.all(
    getTasks().map((task) => {
      const { description } = task;
      return db.task.create({
        data: {
          description,
          taskStateId: 1,
          userId: user.id,
        },
      });
    })
  );
}

seed();

function getUsers(): Array<User> {
  return [
    {
      name: "Fernando",
      email: "Montano",
      token: "AD18273Y1O23BHKALJSD",
    },
    {
      name: "John",
      email: "Doe",
      token: "AD18273Y1O23BHKALJSDF",
    },
  ];
}

function getTasks(): Array<Task> {
  return [
    {
      description: "Get milk",
    },
    {
      description: "Get suggar",
    },
    {
      description: "Get stuff",
    },
    {
      description: "Get items",
    },
  ];
}

function getStates(): Array<TaskStates> {
  return [
    {
      state: "Fulfilled",
    },
    {
      state: "Pending",
    },
    {
      state: "Uncompleted",
    },
  ];
}
