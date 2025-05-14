import {
    RankCounts,
    RankType,
    Reset,
    ShareDialog,
    UpdateDialog,
    UserDialog,
} from '@/feature/table/data/TableTypes';

export type Mode = 'TABLE' | 'SEARCH';

export interface Environment {
    mode: Mode;
    userDialog: UserDialog;
    resetDialog: Reset;
    shareDialog: ShareDialog;
    shareCode: string;
    updateDialog: UpdateDialog;
    singleUpdatePatternId: number;
    singleUpdateMusicTitle: string;
    updateRank: RankType;
    rankCount: RankCounts;
    displayCheckbox: boolean;
    displayRank: boolean;
    displayRemoved: boolean;
}
