import { Request, Response, NextFunction } from "express";
import TaskModel from "../model/task.model";
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req.body", req.body);
    const { task_name, task_description, task_priority, task_dealine } =
      req.body;

    const task = await TaskModel.create({
      task_name,
      task_description,
      task_priority,
      task_dealine,
    });

    res.status(201).json({
      message: "add new task successfully ",
      task,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export default {
  createPost,
};
