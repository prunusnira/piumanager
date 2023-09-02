import {useEffect} from "react";
import {rankToText} from "../tools/rankTextConvert";
import {RankType} from "../data/rankType";
import {IPattern} from "../data/IPattern";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {atomPaternUpdateDialog, atomStatus} from "../recoil/status";
import {atomUser} from "../recoil/user";
import {emptyRankCount} from "../data/IRankCount";
import useSkillPoint from "./useSkillPoint";

const usePatternDialog = () => {
    const [status, setStatus] = useRecoilState(atomStatus);
    const user = useRecoilValue(atomUser);
    const {order, calculate} = useSkillPoint();
    const setPatternUpdateDialog = useSetRecoilState(atomPaternUpdateDialog);

    // 테이블 데이터 변경 이후에 수행하는 effect
    useEffect(() => {
        for (let i = 0; i < status.ptIdList.length; i++) {
            const ptid = status.ptIdList[i];

            if (user.userPattern.has(ptid)) {
                const data = user.userPattern.get(ptid);
                if (data) updateData(ptid, {rank: data.rank, breakOff: data.breakOff, side: data.side, lv: data.lv});
            }
        }
        setStatus({
            ...status,
            selectedPatternId: 0
        })
        rankCountReset();
        updateRankCount();
    }, [status.ptIdList]);

    // 업데이트 창 닫기
    const closeUpdatePatternDlg = () => {
        setStatus({
            ...status,
            selectedPatternId: 0,
        })
        setPatternUpdateDialog(false)
    };

    const rankCountReset = () => {
        setStatus({
            ...status,
            rankcount: emptyRankCount
        })
    };

    const updateRankCount = () => {
        let sssp = 0;
        let sss = 0;
        let ssp = 0;
        let ss = 0;
        let sp = 0;
        let s = 0;
        let aaap = 0;
        let aaa = 0;
        let aap = 0;
        let aa = 0;
        let ap = 0;
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let f = 0;
        let ssspb = 0;
        let sssb = 0;
        let sspb = 0;
        let ssb = 0;
        let spb = 0;
        let sb = 0;
        let aaapb = 0;
        let aaab = 0;
        let aapb = 0;
        let aab = 0;
        let apb = 0;
        let ab = 0;
        let bb = 0;
        let cb = 0;
        let db = 0;
        let fb = 0;

        for (let i = 0; i < status.ptIdList.length; i++) {
            if (user.userPattern.has(status.ptIdList[i])) {
                const stat = user.userPattern.get(status.ptIdList[i]);
                switch (stat?.rank) {
                    case RankType.PH_SSSPlus:
                        stat.breakOff ? ssspb++ : sssp++;
                        break;
                    case RankType.PH_SSS:
                        stat.breakOff ? sssb++ : sss++;
                        break;
                    case RankType.PH_SSPlus:
                        stat.breakOff ? sspb++ : ssp++;
                        break;
                    case RankType.PH_SS:
                        stat.breakOff ? ssb++ : ss++;
                        break;
                    case RankType.PH_SPlus:
                        stat.breakOff ? spb++ : sp++;
                        break;
                    case RankType.PH_S:
                        stat.breakOff ? sb++ : s++;
                        break;
                    case RankType.PH_AAAPlus:
                        stat.breakOff ? aaapb++ : aaap++;
                        break;
                    case RankType.PH_AAA:
                        stat.breakOff ? aaab++ : aaa++;
                        break;
                    case RankType.PH_AAPlus:
                        stat.breakOff ? aapb++ : aap++;
                        break;
                    case RankType.PH_AA:
                        stat.breakOff ? aab++ : aa++;
                        break;
                    case RankType.PH_APlus:
                        stat.breakOff ? apb++ : ap++;
                        break;
                    case RankType.PH_A:
                        stat.breakOff ? ab++ : a++;
                        break;
                    case RankType.PH_B:
                        stat.breakOff ? bb++ : b++;
                        break;
                    case RankType.PH_C:
                        stat.breakOff ? cb++ : c++;
                        break;
                    case RankType.PH_D:
                        stat.breakOff ? db++ : d++;
                        break;
                    case RankType.PH_F:
                        stat.breakOff ? fb++ : f++;
                        break;
                }
            }
        }

        setStatus({
            ...status,
            rankcount: {
                sssp,
                sss,
                ssp,
                ss,
                sp,
                s,
                aaap,
                aaa,
                aap,
                aa,
                ap,
                a,
                b,
                c,
                d,
                f,
                ssspb,
                sssb,
                sspb,
                ssb,
                spb,
                sb,
                aaapb,
                aaab,
                aapb,
                aab,
                apb,
                ab,
                bb,
                cb,
                db,
                fb
            }
        })
    }

    const updateData = (ptid: number, data: IPattern) => {
        user.userPattern.set(ptid, data);
        updateRecord(ptid);

        order()
        calculate()
        closeUpdatePatternDlg();
    };

    const updateMultipleData = (data: IPattern) => {
        const checked = document.querySelectorAll("input[id=ptnsel]:checked");
        for (let i = 0; i < checked.length; i++) {
            const ptid = (checked[i] as HTMLInputElement).value;
            user.userPattern.set(parseInt(ptid), data);
            updateRecord(parseInt(ptid));
        }

        order()
        calculate()
        closeUpdatePatternDlg();
    };

    const updateRecord = (ptid: number) => {
        const img = document.getElementById("cs" + ptid);
        const boimg = document.getElementById("bo" + ptid);
        const data = user.userPattern.get(ptid);

        if (data && img && boimg) {
            img.setAttribute("src", `${process.env.PUBLIC_URL}/img/${rankToText(data.rank)}.png`);
            data.breakOff && boimg.setAttribute("src", `${process.env.PUBLIC_URL}/img/phrank/breakoff.png`);
        }
    };

    return {closeUpdatePatternDlg, updateMultipleData, rankCountReset, updateRankCount, updateData};
};

export default usePatternDialog;
