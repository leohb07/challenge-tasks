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
    const createdTask = await inMemoryTaskRepository.create({
      title: "Create a task for test",
      description: "This task is used to test",
    });

    const taskId = createdTask._id as string;

    const { task } = await sut.execute({ taskId });

    expect(task.completed_at).toEqual(expect.any(Date));
  });

  it("should be able uncomplete a task", async () => {
    const taskCreated = await inMemoryTaskRepository.create({
      title: "Create a task for test",
      description: "This task is used to test",
    });

    const taskId = taskCreated._id as string;

    await sut.execute({ taskId });

    const { task } = await sut.execute({ taskId });

    expect(task._id).toEqual(expect.any(String));
    expect(task.created_at).toBeUndefined();
  });
});
