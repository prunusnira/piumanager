import { PatternType } from "../data/patternType"
import {IStatus} from "../data/IStatus"
import { ResetType } from "../data/resetType"
import { UserDlgType } from "../data/userDlgType"
import { PatternDlgType } from "../data/patternDlgType"
import { ShareDlgType } from "../data/shareDlgType"
import { RankType } from "../data/rankType"
import {emptyRankCount} from "../data/IRankCount";
import {atom} from "jotai";

export const atomStatus = atom<IStatus>({
    patternType: PatternType.SINGLE,
    patternLv: 0,
    isShareData: false,
    isUserLoaded: false,
    ptIdList: new Array<number>(),

    showArcade: true,
    showShort: true,
    showFull: true,
    showRemix: true,

    showRemovedPattern: false,

    showTableRank: true,
    showTableCheck: false,

    userDlgType: UserDlgType.NEWUSER,
    resetType: ResetType.NONE,
    shareDlgType: ShareDlgType.FAIL,
    shareCode: '',
    patternUpdDlgType: PatternDlgType.SINGLE,
    selectedPatternId: 0,
    selectedMusicTitle: '',
    updateRank: RankType.NP,

    rankcount: emptyRankCount,
})

export const atomUserDialog = atom<boolean>(false)
export const atomUserResetDialog = atom<boolean>(false)
export const atomSaveAlertDialog = atom<boolean>(false)
export const atomPaternUpdateDialog = atom<boolean>(false)
export const atomShareDialog = atom<boolean>(false)
