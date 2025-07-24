/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Task = {
    id?: string;
    title?: string;
    description?: string | null;
    status?: Task.status;
    priority?: Task.priority;
    endDate?: string;
    assignedTo?: string | null;
    createdBy?: string;
    lastUpdatedOn?: string;
    lastUpdatedBy?: string;
    createdAt?: string;
};
export namespace Task {
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

