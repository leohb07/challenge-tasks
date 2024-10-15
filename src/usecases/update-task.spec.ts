import { InMemoryTaskRepository } from "../repositories/in-memory/in-memory-task.repository";
import { UpdateTaskUseCase } from "./update-task";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: UpdateTaskUseCase;

describe("Update Task Use Case", () => {
  beforeEach(() => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    sut = new UpdateTaskUseCase(inMemoryTaskRepository);
  });

  it("should be able update a task", async () => {
    const createdTask = await inMemoryTaskRepository.create({
      title: "Create a task for test",
      description: "This task is used to test",
    });

    const { task } = await sut.execute({
      taskId: createdTask._id as string,
      description: "Updated description",
      title: "New title",
    });

    expect(task).toEqual(
      expect.objectContaining({
        title: "New title",
        description: "Updated description",
      })
    );
    expect(task._id).toEqual(expect.any(String));
  });

  it("should not be able update a task whitout task id", async () => {
    await expect(() =>
      sut.execute({ taskId: "12653152" })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able update a task whitout title and description", async () => {
    const createdTask = await inMemoryTaskRepository.create({
      title: "Create a task for test",
      description: "This task is used to test",
    });

    await expect(() =>
      sut.execute({
        taskId: createdTask._id as string,
        description: "",
        title: "",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
