import { randomUUID } from "crypto";
import { Task } from "../../model/task";
import { TaskRepository } from "../../model/task-repository";
import { TaskStatusEnum } from "../../model/enum/task-status.enum";

export class InMemoryTaskRepository implements TaskRepository {
  public tasksColletion: Task[] = [];

  async create(data: Task): Promise<Task> {
    const payload: Task = {
      _id: randomUUID(),
      title: data.title,
      description: data.description,
      completed_at: data.completed_at,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };

    this.tasksColletion.push(payload);

    return payload;
  }

  async update(taskId: string, data: Task): Promise<Task> {
    const findIndex = this.tasksColletion.findIndex(
      (item) => item._id === taskId
    );

    this.tasksColletion[findIndex] = data;

    return data;
  }

  async delete(taskId: string): Promise<void> {
    const newColletion = this.tasksColletion.filter(
      (task) => task._id !== taskId
    );

    this.tasksColletion = newColletion;
  }

  async findAll(filter?: string): Promise<Task[]> {
    if (filter) {
      const tasks = this.tasksColletion.filter(
        (where) =>
          where.title.includes(filter) || where.description.includes(filter)
      );

      return tasks;
    }

    return this.tasksColletion;
  }

  async findById(id: string): Promise<Task | undefined> {
    const task = this.tasksColletion.find((item) => item._id === id);

    return task;
  }
}
