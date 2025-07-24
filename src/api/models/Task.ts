import type { Priority } from "../../enums/Priority";
import type { TaskStatus } from "../../enums/TaskStatus";

export type Task = {
    id?: string;
    title?: string;
    description?: string | null;
    status?: TaskStatus;
    priority?: Priority;
    endDate?: string;
    assignedTo?: string | null;
    createdBy?: string;
    lastUpdatedOn?: string;
    lastUpdatedBy?: string;
    createdAt?: string;
};