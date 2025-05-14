import { Pattern } from '@/feature/table/data/Pattern';

export interface User {
    userName: string;
    userLv: number;
    userPattern: Map<number, Pattern>; // mid, data
}
