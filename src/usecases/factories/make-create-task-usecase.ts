import { InMemoryTaskRepository } from "../../repositories/in-memory/in-memory-task.repository";
import { CreateTaskUseCase } from "../create-task";

export function makeCreateTaskUseCase() {
  const inMemoryTaskRepository = new InMemoryTaskRepository();

  const usecase = new CreateTaskUseCase(inMemoryTaskRepository);

  return usecase;
}
