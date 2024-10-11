import { Task } from "../model/task";
import { TaskRepository } from "../model/task-repository";

export interface UpdateTaskUseCaseRequest {
  taskId: string;
  title: string;
  description: string;
}

export interface UpdateTaskUseCaseResponse {
  task: Task;
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ taskId, title, description }: UpdateTaskUseCaseRequest) {
    const findById = await this.taskRepository.findById(taskId);

    if (!findById) {
      throw new Error("Task not found.");
    }

    if (!title && !description) {
      throw new Error("Resource not found.");
    }

    const payload: Task = {
      ...findById,
      title: title ?? findById.title,
      description: description ?? findById.description,
      updated_at: new Date(),
    };

    const task = await this.taskRepository.update(taskId, payload);

    return {
      task,
    };
  }
}
