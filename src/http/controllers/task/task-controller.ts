import { Request, Response } from "express";
import { makeCreateTaskUseCase } from "../../../usecases/factories/make-create-task-usecase";
import { makeFindAllTasksUseCase } from "../../../usecases/factories/make-find-all-tasks-usecase";
import { makeUpdateTaskUseCase } from "../../../usecases/factories/make-update-task-usecase";
import { makeDeleteTaskUseCase } from "../../../usecases/factories/make-delete-task-usecase";
import { makeCompleteTaskUseCase } from "../../../usecases/factories/make-complete-task-usecase";

export class TaskController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;
    const usecase = makeCreateTaskUseCase();

    const { task } = await usecase.execute({ title, description });

    res.status(200).send({
      task,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;

    const usecase = makeUpdateTaskUseCase();

    const { task } = await usecase.execute({ taskId: id, description, title });

    res.status(200).send({
      task,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const usecase = makeDeleteTaskUseCase();
    await usecase.execute({ taskId: id });

    res.status(201).send();
  }

  async findAll(req: Request, res: Response) {
    const { filter } = req.query;

    const usecase = makeFindAllTasksUseCase();

    const { tasks } = await usecase.execute({
      filter: filter as unknown as string,
    });

    res.status(200).send({
      tasks,
    });
  }

  async complete(req: Request, res: Response) {
    const { id } = req.params;

    const usecase = makeCompleteTaskUseCase();

    const { task } = await usecase.execute({ taskId: id });

    res.status(200).send({
      task,
    });
  }
}
