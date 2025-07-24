/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateTaskRequest = {
    id: string;
    title?: string;
    description?: string;
    status?: UpdateTaskRequest.status;
    priority?: UpdateTaskRequest.priority;
    endDate?: string;
};
export namespace UpdateTaskRequest {
    export enum status {
        PENDING = 'PENDING',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
    }
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
    }
}

