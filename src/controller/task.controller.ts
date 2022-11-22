import { Request, Response, NextFunction } from "express";
import TaskModel from "../model/task.model";
import { validationResult } from "express-validator";
import getValidationReport from "../utils/handler/validation.error.handler";
import HttpException from "../utils/handler/HttpErrorHandler";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validationError = getValidationReport(validationResult(req).array());
    if (validationError.length > 0) {
      throw new HttpException(400, "Validation Error", validationError);
    }

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
    next(error);
  }
};

export default {
  createPost,
};
