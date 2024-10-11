import { InMemoryTaskRepository } from "../repositories/in-memory/in-memory-task.repository";
import { DeleteTaskUseCase } from "./delete-task";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: DeleteTaskUseCase;

describe("Delete Task Use Case", () => {
  beforeEach(() => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    sut = new DeleteTaskUseCase(inMemoryTaskRepository);
  });

  it("should be able delete a task", async () => {
    const task = await inMemoryTaskRepository.create({
      title: "Create a task for test",
      description: "This task is used to test",
    });

    await sut.execute({ taskId: task._id! });

    const findAll = await inMemoryTaskRepository.findAll();

    expect(findAll).toEqual([]);
  });

  it("should not be able delete a task if not found task", async () => {
    await expect(() =>
      sut.execute({ taskId: "1827as187319" })
    ).rejects.toBeInstanceOf(Error);
  });
});
