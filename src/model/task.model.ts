import { model, Schema } from "mongoose";
import TaskInterface from "utils/interface/task.interface";

const TaskSchema = new Schema<TaskInterface>(
  {
    task_name: {
      type: String,
      required: [true, "Task Name Must be Provide"],
      trim: true,
    },
    task_description: { type: String, trim: true },
    task_status: { type: Boolean, required: true, default: false },
    task_priority: { type: String, enum: ["HIGH", "MEDIUM", "LOW"] },
    // task_report: {},
    // task_assigned: {},
    task_dealine: { type: Date, require: [true, "Please mention dealine"] },
  },
  { timestamps: true }
);

export default model<TaskInterface>("Task", TaskSchema);
