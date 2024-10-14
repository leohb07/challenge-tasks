import { Task } from "./task";

export interface TaskRepository {
  create(data: Task): Promise<Task>;
  update(taskId: string, data: Task): Promise<Task>;
  findAll(filter?: string): Promise<Task[]>;
  findById(taskId: string): Promise<Task | null>;
  delete(taskId: string): Promise<void>;
}
