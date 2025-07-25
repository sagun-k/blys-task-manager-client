/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskRequest } from '../models/CreateTaskRequest';
import type { Task } from '../models/Task';
import type { TaskStats } from '../models/TaskStats';
import type { UpdateTaskRequest } from '../models/UpdateTaskRequest';
import type { UpdateTaskStatusRequest } from '../models/UpdateTaskStatusRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * Create a new task
     * @param requestBody
     * @returns Task Task created successfully
     * @throws ApiError
     */
    public static createTask(
        requestBody: CreateTaskRequest,
    ): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/tasks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
            },
        });
    }
    /**
     * Get paginated list of tasks for authenticated user
     * @param page Page number
     * @param limit Number of tasks per page
     * @param sort Field to sort by
     * @param order Sort order
     * @returns any List of tasks
     * @throws ApiError
     */
    public static getTasks(
        page: number = 1,
        limit: number = 10,
        sort: 'createdAt' | 'endDate' | 'priority' | 'status' = 'createdAt',
        order: 'asc' | 'desc' = 'desc',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tasks',
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'order': order,
            },
            errors: {
                401: `Unauthorized - invalid or missing token`,
            },
        });
    }
    /**
     * Update an existing task
     * @param id Task ID
     * @param requestBody
     * @returns Task Updated task object
     * @throws ApiError
     */
    public static updateTask(
        id: string,
        requestBody: UpdateTaskRequest,
    ): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error`,
                401: `Unauthorized`,
                404: `Task not found`,
            },
        });
    }
    /**
     * @param id Task ID
     * @returns void
     * @throws ApiError
     */
    public static deleteTask(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                404: `Task not found`,
            },
        });
    }
    /**
     * Get statistics of tasks for the authenticated user
     * @returns TaskStats Task statistics retrieved successfully
     * @throws ApiError
     */
    public static getTaskStats(): CancelablePromise<TaskStats> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tasks/stats',
            errors: {
                401: `Unauthorized - invalid or missing token`,
            },
        });
    }
    /**
     * Update task status
     * @param id Task ID
     * @param requestBody
     * @returns any Task status updated successfully
     * @throws ApiError
     */
    public static updateTaskStatus(
        id: string,
        requestBody: UpdateTaskStatusRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/tasks/{id}/status',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
