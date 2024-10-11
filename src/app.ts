import "express-async-errors";
import express from "express";

import { taskRoutes } from "./http/controllers/task/task-routes";
import { errorHandler } from "./http/middlewares/error-handler-middleware";

export const app = express();

app.use(express.json());

app.use(taskRoutes);

app.use(errorHandler);
