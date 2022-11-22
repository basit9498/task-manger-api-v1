import { Schema } from "mongoose";

// enum prioirty {
//   HIGH,
//   MEDIUM,
//   LOW,
// }

export default interface TaskInterface {
  task_name: string;
  task_description: string;
  task_status: boolean;
  task_priority: string;
  task_report: Schema.Types.ObjectId;
  task_assigned: Schema.Types.ObjectId;
  task_dealine: Date;
}
