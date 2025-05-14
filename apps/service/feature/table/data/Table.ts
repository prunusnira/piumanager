import { PatternType } from '@/feature/table/data/TableTypes';

export interface TableStatus {
    patternType: PatternType;
    patternLevel: number;
    isShareData: boolean;
    isUserLoaded: boolean;
    patternIdList: number[];
    sortOrder: 'NAME' | 'VERASC' | 'VERDESC';
    display: 'ALL' | 'PLAYED' | 'NOPLAY';
    search?: string;
}

export interface TableDisplay {
    arcade: boolean;
    short: boolean;
    full: boolean;
    remix: boolean;
    removed: boolean;
    rank: boolean;
    checkbox: boolean;
}
