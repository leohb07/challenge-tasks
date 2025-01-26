import { Router } from "express";
import { TaskController } from "./task-controller";

export const taskRoutes = Router();

const taskController = new TaskController();

taskRoutes.get("/tasks", taskController.findAll);
taskRoutes.put("/task/:id", taskController.update);
taskRoutes.post("/task", taskController.create);
taskRoutes.delete("/task/:id", taskController.delete);
taskRoutes.patch("/task/:id/complete", taskController.complete);
