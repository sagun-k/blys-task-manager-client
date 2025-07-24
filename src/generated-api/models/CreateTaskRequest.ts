/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTaskRequest = {
    title: string;
    description: string;
    priority: CreateTaskRequest.priority;
    endDate: string;
};
export namespace CreateTaskRequest {
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
    }
}

