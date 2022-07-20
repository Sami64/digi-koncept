import { Category } from "../../categories/types";

export interface Job {
    id: string;
    kreatorId: string;
    title: string;
    description: string;
    category: Category;
}