import { InMemoryTaskRepository } from "../repositories/in-memory/in-memory-task.repository";
import { CreateTaskUseCase } from "./create-task";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

let inMemoryTaskRepository: InMemoryTaskRepository;
let sut: CreateTaskUseCase;

describe("Create Task Use Case", () => {
  beforeEach(() => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    sut = new CreateTaskUseCase(inMemoryTaskRepository);
  });

  it("should be able create task", async () => {
    const taskRequest = {
      title: "Create Task",
      description: "You need create a task",
    };

    const { task } = await sut.execute(taskRequest);

    expect(task._id).toEqual(expect.any(String));
    expect(task.title).toEqual("Create Task");
    expect(task.description).toEqual("You need create a task");
  });

  it("should not be able create task without title", async () => {
    await expect(() =>
      sut.execute({
        title: "",
        description: "You need create a task",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able create task without description", async () => {
    await expect(() =>
      sut.execute({
        title: "Create Task",
        description: "",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
