import express from "express";
import { userRouter } from "./user.route";
import { taskRouter } from "./task.route";

export const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);

export default router;
