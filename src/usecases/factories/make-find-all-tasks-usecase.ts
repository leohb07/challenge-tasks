import { InMemoryTaskRepository } from "../../repositories/in-memory/in-memory-task.repository";
import { FindAllTasksUseCase } from "../find-all-tasks";

export function makeFindAllTasksUseCase() {
  const inMemoryTaskRepository = new InMemoryTaskRepository();

  const usecase = new FindAllTasksUseCase(inMemoryTaskRepository);

  return usecase;
}
