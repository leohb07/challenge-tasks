import { InMemoryTaskRepository } from "../../repositories/in-memory/in-memory-task.repository";
import { CompleteTaskUseCase } from "../complete-task";

export function makeCompleteTaskUseCase() {
  const inMemoryTaskRepository = new InMemoryTaskRepository();

  const usecase = new CompleteTaskUseCase(inMemoryTaskRepository);

  return usecase;
}
