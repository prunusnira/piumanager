import { RankType } from '@/feature/table/data/Rank';

export interface PatternItem {
    patternId: number;
    musicId: number;
    titleEn: string;
    titleKo: string;
    sdtype: string;
    level: number;
    steptype: string;
    difficulty: string;
    songtype: string;
    removed: number;
    version: number;
    newpattern: number;
}

export interface MusicItem extends PatternItem {
    rank?: RankType;
    breakOff?: boolean;
}

/** 버전
 * 1: 1st
 * 2: 2nd
 * 3: OBG
 * 4: OBGSE
 * 5: PC
 * 6: EXTRA
 * 7: REBIRTH
 * 8: PREX3
 * 9: EXCEED
 * 10: EXCEED2
 * 11: ZERO
 * 12: NX
 * 13: NX2
 * 14: NXA
 * 15: FIESTA
 * 16: FIESTA EX
 * 17: FIESTA 2
 * 18: PRIME
 * 19: PRIME2
 * 20: XX
 * 21: PHOENIX
 * */
