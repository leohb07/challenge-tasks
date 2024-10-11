import { Task } from "../model/task";
import { TaskRepository } from "../model/task-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

export interface CreateTaskUseCaseRequest {
  title: string;
  description: string;
}

export interface CreateTaskUseCaseResponse {
  task: Task;
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    description,
    title,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    if (!title) {
      throw new ResourceNotFoundError();
    }

    if (!description) {
      throw new ResourceNotFoundError();
    }

    const task = await this.taskRepository.create({
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return {
      task,
    };
  }
}
