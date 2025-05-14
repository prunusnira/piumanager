import { RankType } from '@/feature/table/data/Rank';

export interface IPattern {
    rank: RankType;
    breakOff: boolean;
    side: number;
    lv: number;
}
