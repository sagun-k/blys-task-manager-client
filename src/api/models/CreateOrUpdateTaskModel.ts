import type { Priority } from "../../enums/Priority";

export type CreateOrUpdateTaskModel = {
    id?:string;
    title: string;
    description: string;
    priority: Priority;
    endDate: string;
};