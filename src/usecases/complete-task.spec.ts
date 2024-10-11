import { InMemoryTaskRepository } from "../repositories/in-memory/in-memory-task.repository";
import { CompleteTaskUseCase } from "./complete-task";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: CompleteTaskUseCase;

describe("Complete Task Use Case", () => {
  beforeEach(() => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    sut = new CompleteTaskUseCase(inMemoryTaskRepository);
  });

  it("should be able complete a task", async () => {
    const task = await inMemoryTaskRepository.create({
      title: "Create a task for test",
      description: "This task is used to test",
    });

    await sut.execute({ taskId: task._id! });

    const findAll = await inMemoryTaskRepository.findAll();

    expect(findAll).toEqual([]);
  });
});
