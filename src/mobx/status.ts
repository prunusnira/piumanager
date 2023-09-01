import { PatternType } from "../data/patternType"
import {makeAutoObservable} from 'mobx'
import StatusType from "../data/statusType"
import { ResetType } from "../data/resetType"
import { UserDlgType } from "../data/userDlgType"
import { PatternDlgType } from "../data/patternDlgType"
import { ShareDlgType } from "../data/shareDlgType"
import { RankType } from "../data/rankType"
import {emptyRankCount, RankCountType} from "../data/rankCountType";

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

    showRemovedPattern: false,

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

    rankcount: emptyRankCount,
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

    public setRankCount = (count: RankCountType) => {
        this.status.rankcount = count;
    }

    public resetRankCount = () => {
        this.status.rankcount = emptyRankCount;
    }

    public setPatternIDList = (ptId: Array<number>) => {
        this.status.ptIdList = ptId;
    }

    public setShowArcade = (show: boolean) => {
        this.status.showArcade = show;
    }

    public setShowShort = (show: boolean) => {
        this.status.showShort = show;
    }

    public setShowFull = (show: boolean) => {
        this.status.showFull = show;
    }

    public setShowRemix = (show: boolean) => {
        this.status.showRemix = show;
    }

    public setShowRemoved = (show: boolean) => {
        this.status.showRemovedPattern = show;
    }

    public setShareData = (share: boolean) => {
        this.status.isShareData = share;
    }

    public setResetType = (reset: ResetType) => {
        this.status.resetType = reset;
    }

    public setShowUserDialog = (show: boolean) => {
        this.status.showUserDialog = show;
    }

    public setShowResetDialog = (show: boolean) => {
        this.status.showUserResetDialog = show;
    }

    public setShowSaveBeforeLoad = (show: boolean) => {
        this.status.showSaveBeforeLoadDialog = show;
    }

    public setUserDlgType = (type: UserDlgType) => {
        this.status.userDlgType = type;
    }

    public setUserLoaded = (loaded: boolean) => {
        this.status.isUserLoaded = loaded;
    }

    public setPatternType = (pattern: PatternType) => {
        this.status.patternType = pattern;
    }

    public setPatternLv = (lv: number) => {
        this.status.patternLv = lv;
    }

    public setPatternUpdDlgType = (type: PatternDlgType) => {
        this.status.patternUpdDlgType = type;
    }

    public setSelectedPatternId = (id: number) => {
        this.status.selectedPatternId = id;
    }

    public setSelectedMusicTitle = (title: string) => {
        this.status.selectedMusicTitle = title;
    }

    public setShowPatternUpdateDialog = (show: boolean) => {
        this.status.showPtUpdDlg = show;
    }

    public setUpdateRank = (rank: RankType) => {
        this.status.updateRank = rank;
    }
}

const Status = new StoreStatus()

export default Status;