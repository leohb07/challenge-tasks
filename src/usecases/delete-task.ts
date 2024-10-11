import { TaskRepository } from "../model/task-repository";

export interface DeleteTaskUseCaseRequest {
  taskId: string;
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ taskId }: DeleteTaskUseCaseRequest): Promise<void> {
    const findById = await this.taskRepository.findById(taskId);

    if (!findById) {
      throw new Error("Task not found.");
    }

    await this.taskRepository.delete(taskId);
  }
}
