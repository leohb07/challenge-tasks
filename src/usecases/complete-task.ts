import { Task } from "../model/task";
import { TaskRepository } from "../model/task-repository";

export interface CompleteTaskUseCaseRequest {
  taskId: string;
}

export interface CompleteTaskUseCaseResponse {
  task: Task;
}

export class CompleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    taskId,
  }: CompleteTaskUseCaseRequest): Promise<CompleteTaskUseCaseResponse> {
    if (!taskId) {
      throw new Error("You need send task id.");
    }

    const findById = await this.taskRepository.findById(taskId);

    if (!findById) {
      throw new Error("Task not found.");
    }

    const isCompleted = findById.completed_at;

    findById.completed_at = isCompleted ? null : new Date();

    const task = await this.taskRepository.update(taskId, findById);

    return {
      task,
    };
  }
}
