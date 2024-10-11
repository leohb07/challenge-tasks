import { Router } from "express";
import { TaskController } from "./task-controller";

export const taskRoutes = Router();

const taskController = new TaskController();

taskRoutes.get("/tasks", taskController.findAll);
taskRoutes.put("/tasks/:id", taskController.update);
taskRoutes.post("/tasks", taskController.create);
taskRoutes.delete("/tasks/:id", taskController.delete);
taskRoutes.patch("/tasks/:id/complete", taskController.complete);
