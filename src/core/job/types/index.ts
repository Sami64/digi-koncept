import { Category } from '../../categories/types';
import { Kreator } from '../../users/types';

export interface Job {
    id: string;
    kreator: Kreator;
    title: string;
    description: string;
    category: Category;
}
