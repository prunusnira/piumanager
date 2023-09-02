import Store from "../mobx/store"
import { PatternType } from "../data/patternType"

const useResetModal = (
    setAllowUserNew: (b: boolean) => void,
    setAllowUserLoad: (b: boolean) => void,
) => {
    const { status, user, table } = Store

    const runUserReset = () => {
        status.status.isUserLoaded = false
        user.user.userName = ''
        user.user.userLv = 0
        user.user.userStatus = new Map()
        status.status.patternType = PatternType.SINGLE
        status.status.patternLv = 0

        table.resetTable()
        status.setShowUserResetDialog(false)

        if(status.status.resetType === 1) {
            setAllowUserNew(true)
        }
        else if(status.status.resetType === 2) {
            setAllowUserLoad(true)
        }
    }

    return {
        runUserReset
    }
}

export default useResetModal