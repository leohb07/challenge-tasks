import { Task } from "../model/task";
import { TaskRepository } from "../model/task-repository";

export interface FindAllTasksUseCaseParams {
  filter?: string;
}

export interface FindAllTasksUseCaseResponse {
  tasks: Task[];
}

export class FindAllTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    filter,
  }: FindAllTasksUseCaseParams): Promise<FindAllTasksUseCaseResponse> {
    const tasks = await this.taskRepository.findAll(filter);

    if (tasks?.length <= 0) {
      throw new Error("Tasks is empty");
    }

    return {
      tasks,
    };
  }
}
