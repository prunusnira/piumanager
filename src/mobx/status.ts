import { PatternType } from "../components/table/data/patternType"
import {makeAutoObservable} from 'mobx'
import StatusType from "../components/table/data/statusType"
import { ResetType } from "../components/table/data/resetType"
import { UserDlgType } from "../components/table/data/userDlgType"
import { PatternDlgType } from "../components/table/data/patternDlgType"
import { ShareDlgType } from "../components/table/data/shareDlgType"
import { RankType } from "../components/table/data/rankType"

const defaultStatus: StatusType = {
    patternType: PatternType.SINGLE,
    patternLv: 0,
    isShareData: false,
    isUserLoaded: false,
    ptIdList: new Array<number>(),

    showArcade: true,
    showShort: true,
    showFull: true,
    showRemix: true,

    showTableRank: true,
    showTableCheck: false,

    showUserDialog: false,
    showUserResetDialog: false,
    showSaveBeforeLoadDialog: false,
    showPtUpdDlg: false,
    showShareDlg: false,
    
    userDlgType: UserDlgType.NEWUSER,
    resetType: ResetType.NONE,
    shareDlgType: ShareDlgType.FAIL,
    shareCode: '',
    patternUpdDlgType: PatternDlgType.SINGLE,
    selectedPatternId: 0,
    selectedMusicTitle: '',
    updateRank: RankType.NP,

    rankcount: {
        sss: 0,
        ss: 0,
        s: 0,
        aon: 0,
        aoff: 0,
        bcdon: 0,
        bcdoff: 0,
        f: 0,
        np: 0,
    },
}

class StoreStatus {
    constructor() {
        makeAutoObservable(this)
    }

    public status = defaultStatus

    /**
     * Not recommended to use
     * @param s new status
     */
    public setStatus_NotSafe = (s: StatusType) => {
        this.status = s
    }

    public resetAllStatus = () => {
        this.status = defaultStatus
    }

    public resetRankCount = () => {
        this.status.rankcount = {
            sss: 0,
            ss: 0,
            s: 0,
            aon: 0,
            aoff: 0,
            bcdon: 0,
            bcdoff: 0,
            f: 0,
            np: 0,
        }
    }
}

export default new StoreStatus()