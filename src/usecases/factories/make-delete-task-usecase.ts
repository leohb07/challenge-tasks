import { InMemoryTaskRepository } from "../../repositories/in-memory/in-memory-task.repository";
import { DeleteTaskUseCase } from "../delete-task";

export function makeDeleteTaskUseCase() {
  const inMemoryTaskRepository = new InMemoryTaskRepository();

  const usecase = new DeleteTaskUseCase(inMemoryTaskRepository);

  return usecase;
}
