import { InMemoryTaskRepository } from "../repositories/in-memory/in-memory-task.repository";
import { FindAllTasksUseCase } from "./find-all-tasks";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: FindAllTasksUseCase;

describe("Find All Task Use Case", () => {
  beforeEach(() => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    sut = new FindAllTasksUseCase(inMemoryTaskRepository);
  });

  it("should be able find all tasks", async () => {
    await inMemoryTaskRepository.create({
      title: "Create a task",
      description: "I need create a task",
    });

    const { tasks } = await sut.execute({});

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks).toEqual([
      expect.objectContaining({
        title: "Create a task",
        description: "I need create a task",
      }),
    ]);
  });

  it("should be able find tasks with filter", async () => {
    await inMemoryTaskRepository.create({
      title: "Create a task",
      description: "I go create a task",
    });

    await inMemoryTaskRepository.create({
      title: "I need run tomorrow",
      description: "I need run everyday",
    });

    const { tasks } = await sut.execute({ filter: "I need run tomorrow" });

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks).toEqual([
      expect.objectContaining({
        title: "I need run tomorrow",
        description: "I need run everyday",
      }),
    ]);
  });

  it("should not be able find tasks when tasks is empty", async () => {
    await expect(() => sut.execute({})).rejects.toBeInstanceOf(Error);
  });

  it("should not be able find tasks when filter is invalid", async () => {
    await inMemoryTaskRepository.create({
      title: "Create a task",
      description: "I go create a task",
    });

    await expect(() => sut.execute({ filter: "error" })).rejects.toBeInstanceOf(
      Error
    );
  });
});
