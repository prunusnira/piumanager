import { PatternDlgType } from "./patternDlgType";
import { PatternType } from "./patternType";
import { RankType } from "./rankType";
import { ResetType } from "./resetType";
import { ShareDlgType } from "./shareDlgType";
import { UserDlgType } from "./userDlgType";
import {IRankCount} from "./IRankCount";

export interface IStatus {
    patternType: PatternType,
    patternLv: number,
    isShareData: boolean,
    isUserLoaded: boolean,
    ptIdList: number[],

    showArcade: boolean,
    showShort: boolean,
    showFull: boolean,
    showRemix: boolean,

    showRemovedPattern: boolean,

    showTableRank: boolean,
    showTableCheck: boolean,

    showUserDialog: boolean,
    showUserResetDialog: boolean,
    showSaveBeforeLoadDialog: boolean,
    showPtUpdDlg: boolean,
    showShareDlg: boolean,

    userDlgType: UserDlgType,
    resetType: ResetType,
    shareDlgType: ShareDlgType,
    shareCode: string,
    patternUpdDlgType: PatternDlgType,
    selectedPatternId: number,
    selectedMusicTitle: string,
    updateRank: RankType,

    rankcount: IRankCount,
}
