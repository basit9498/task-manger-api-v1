import HttpException from "../utils/handler/HttpErrorHandler";
import TaskInterface from "../utils/interface/task.interface";
import TaskModel from "../model/task.model";

export const createPostService = async (
  task_name: string,
  task_description: string,
  task_priority: string,
  task_dealine: Date
): Promise<TaskInterface> => {
  try {
    const task = await TaskModel.create({
      task_name,
      task_description,
      task_priority,
      task_dealine,
    });
    return task;
  } catch (error: any) {
    throw new HttpException(400, "Unable to create the Task", [error.message]);
  }
};

export default {
  createPostService,
};
