import { InMemoryTaskRepository } from "../../repositories/in-memory/in-memory-task.repository";
import { UpdateTaskUseCase } from "../update-task";

export function makeUpdateTaskUseCase() {
  const inMemoryTaskRepository = new InMemoryTaskRepository();

  const usecase = new UpdateTaskUseCase(inMemoryTaskRepository);

  return usecase;
}
