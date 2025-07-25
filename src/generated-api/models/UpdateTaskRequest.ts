/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateTaskRequest = {
    id: string;
    title?: string;
    description?: string;
    priority?: UpdateTaskRequest.priority;
    endDate?: string;
};
export namespace UpdateTaskRequest {
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
    }
}

