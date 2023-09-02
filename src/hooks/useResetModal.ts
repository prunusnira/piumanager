import { PatternType } from "../data/patternType"
import {useRecoilState, useSetRecoilState} from "recoil";
import {atomStatus, atomUserResetDialog} from "../recoil/status";
import {atomUser} from "../recoil/user";
import {
    atomTableBelow, atomTableEasy,
    atomTableHigh,
    atomTableNE,
    atomTableNH,
    atomTableNormal,
    atomTableOver, atomTableRandom,
} from "../recoil/table";

const useResetModal = (
    setAllowUserNew: (b: boolean) => void,
    setAllowUserLoad: (b: boolean) => void,
) => {
    const [status, setStatus] = useRecoilState(atomStatus)
    const [user, setUser] = useRecoilState(atomUser)
    const setResetDialog = useSetRecoilState(atomUserResetDialog);

    const setTableOver = useSetRecoilState(atomTableOver);
    const setTableHigh = useSetRecoilState(atomTableHigh);
    const setTableNH = useSetRecoilState(atomTableNH);
    const setTableNormal = useSetRecoilState(atomTableNormal);
    const setTableNE = useSetRecoilState(atomTableNE);
    const setTableEasy = useSetRecoilState(atomTableEasy);
    const setTableBelow = useSetRecoilState(atomTableBelow);
    const setTableRandom = useSetRecoilState(atomTableRandom);

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