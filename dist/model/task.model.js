"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Task", TaskSchema);
