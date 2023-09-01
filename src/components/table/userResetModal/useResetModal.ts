import IntegratedStore from "../../../mobx/integratedStore"
import { PatternType } from "../../../data/patternType"

const useResetModal = (
    resetTable: () => void,
    setAllowUserNew: (b: boolean) => void,
    setAllowUserLoad: (b: boolean) => void,
) => {
    const {status, user} = IntegratedStore

    // 사용자 초기화 다이얼로그 닫기
    const closeUserResetDlg = () => {
        status.status.showUserResetDialog = false
    }

    // 사용자 초기화 실행
    const runUserReset = () => {
        status.status.isUserLoaded = false
        user.user.userName = ''
        user.user.userLv = 0
        user.user.userStatus = new Map()
        status.status.patternType = PatternType.SINGLE
        status.status.patternLv = 0

        resetTable()

        closeUserResetDlg()
        if(status.status.resetType === 1) {
            setAllowUserNew(true)
        }
        else if(status.status.resetType === 2) {
            setAllowUserLoad(true)
        }
    }

    return [
        closeUserResetDlg, runUserReset
    ]
}

export default useResetModal