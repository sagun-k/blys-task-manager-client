import type { TaskStatus } from "../../enums/TaskStatus";
import {
  TasksService,
  UpdateTaskRequest,
  UpdateTaskStatusRequest,
} from "../../generated-api";
import type { PaginatedResponse } from "../../types";
import type { CreateOrUpdateTaskModel } from "../models/CreateOrUpdateTaskModel";
import type { Task } from "../models/Task";
import type { TaskStats } from "../models/TaskStats";
import { throwAsServiceError } from "./throwAsServiceError";

export class TaskService {
  private static async createTask(
    request: CreateOrUpdateTaskModel
  ): Promise<Task | undefined> {
    try {
      const user = await TasksService.createTask({
        ...request,
        priority: request.priority as any,
      });
      return user as Task;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  private static async updateTask(
    request: CreateOrUpdateTaskModel
  ): Promise<Task | undefined> {
    try {
      const user = await TasksService.updateTask(request.id!, {
        ...request,
        priority: request.priority as any,
      } as UpdateTaskRequest);
      return user as Task;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  public static async createOrUpdateTask(request: CreateOrUpdateTaskModel) {
    try {
      if (request.id) {
        return await this.updateTask(request);
      } else {
        return await this.createTask(request);
      }
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  public static async getTasks(
    page: number,
    limit: number,
    sort: "createdAt" | "endDate" | "priority" | "status",
    orderBy: "asc" | "desc"
  ): Promise<PaginatedResponse<Task> | undefined> {
    try {
      const user = await TasksService.getTasks(page, limit, sort, orderBy);
      return user as PaginatedResponse<Task>;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  public static async deleteTask(id: string) {
    try {
      await TasksService.deleteTask(id);
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  public static async getTaskStats(): Promise<TaskStats | undefined> {
    try {
      const tasks = await TasksService.getTaskStats();
      return tasks;
    } catch (err) {
      throwAsServiceError(err);
    }
  }

  public static async updateStatus(
    taskId: string,
    status: TaskStatus
  ): Promise<TaskStats | undefined> {
    try {
      const tasks = await TasksService.updateTaskStatus(taskId, {
        status: status as any,
      } as UpdateTaskStatusRequest);
      return tasks;
    } catch (err) {
      throwAsServiceError(err);
    }
  }
}
