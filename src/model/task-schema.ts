import { randomUUID } from "crypto";
import { Schema, model } from "mongoose";
import { Task } from "./task";

const TaskSchema = new Schema<Task>(
  {
    _id: {
      type: String,
      default: randomUUID,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    completed_at: {
      type: Date,
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    },
  },
  {
    collection: "tasks",
    timestamps: true,
  }
);

export const TaskModel = model("tasks", TaskSchema);
