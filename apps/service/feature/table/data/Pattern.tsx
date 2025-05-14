import { RankType } from '@/feature/table/data/Rank';

export interface Pattern {
    rank: RankType;
    breakOff: boolean;
    side: number;
    lv: number;
}
