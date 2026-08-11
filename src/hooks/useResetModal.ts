import { PatternType } from "../data/patternType"
import {useAtom, useSetAtom} from "jotai";
import {atomStatus, atomUserResetDialog} from "../atoms/status";
import {atomUser} from "../atoms/user";
import {
    atomTableBelow, atomTableEasy,
    atomTableHigh,
    atomTableNE,
    atomTableNH,
    atomTableNormal,
    atomTableOver, atomTableRandom,
} from "../atoms/table";

const useResetModal = (
    setAllowUserNew: (b: boolean) => void,
    setAllowUserLoad: (b: boolean) => void,
) => {
    const [status, setStatus] = useAtom(atomStatus)
    const [user, setUser] = useAtom(atomUser)
    const setResetDialog = useSetAtom(atomUserResetDialog);

    const setTableOver = useSetAtom(atomTableOver);
    const setTableHigh = useSetAtom(atomTableHigh);
    const setTableNH = useSetAtom(atomTableNH);
    const setTableNormal = useSetAtom(atomTableNormal);
    const setTableNE = useSetAtom(atomTableNE);
    const setTableEasy = useSetAtom(atomTableEasy);
    const setTableBelow = useSetAtom(atomTableBelow);
    const setTableRandom = useSetAtom(atomTableRandom);

    const runUserReset = () => {
        setUser({
            ...user,
            userName: '',
            userLv: 0,
            userPattern: new Map(),
        })
        setStatus({
            ...status,
            isUserLoaded: false,
            patternType: PatternType.SINGLE,
            patternLv: 0,
        })
        setResetDialog(false);
        setTableOver([])
        setTableHigh([])
        setTableNH([])
        setTableNormal([])
        setTableNE([])
        setTableEasy([])
        setTableBelow([])
        setTableRandom([])

        if(status.resetType === 1) {
            setAllowUserNew(true)
        }
        else if(status.resetType === 2) {
            setAllowUserLoad(true)
        }
    }

    return {
        runUserReset
    }
}

export default useResetModal