import { PatternDlgType } from "./patternDlgType";
import { PatternType } from "./patternType";
import { RankType } from "./rankType";
import { ResetType } from "./resetType";
import { ShareDlgType } from "./shareDlgType";
import { UserDlgType } from "./userDlgType";

type StatusType = {
    patternType: PatternType,
    patternLv: number,
    isShareData: boolean,
    isUserLoaded: boolean,
    ptIdList: number[],

    showArcade: boolean,
    showShort: boolean,
    showFull: boolean,
    showRemix: boolean,

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

    rankcount: {
        sss: number,
        ss: number,
        s: number,
        aon: number,
        aoff: number,
        bcdon: number,
        bcdoff: number,
        f: number,
        np: number,
    },
}

export default StatusType