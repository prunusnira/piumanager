import {useEffect} from "react";
import IntegratedStore from "../../../mobx/integratedStore";
import {rankToText, textToRank} from "../../../data/rankTextConvert";
import {RankType} from "../../../data/rankType";
import {PatternDlgType} from "../../../data/patternDlgType";

const usePatternDialog = () => {
    const {status, user} = IntegratedStore;

    // 테이블 데이터 변경 이후에 수행하는 effect
    useEffect(() => {
        for (let i = 0; i < status.status.ptIdList.length; i++) {
            const ptid = status.status.ptIdList[i];

            if (user.user.userStatus.has(ptid)) {
                const data = user.user.userStatus.get(ptid);
                if (data) updateData(ptid, data.rank, data.breakOff);
            }
        }
        status.status.selectedPatternId = 0;
        rankCountReset();
        updateRankCount();
    }, [status.status.ptIdList]);

    // 업데이트 창 열기
    const openUpdatePatternDialog = (ptid: number, title: string) => {
        status.status.showPtUpdDlg = true;
        status.status.selectedMusicTitle = title;
        status.status.selectedPatternId = ptid;
        status.status.patternUpdDlgType = PatternDlgType.SINGLE;
    };

    const openUpdatePatternMultiple = () => {
        status.status.showPtUpdDlg = true;
        status.status.patternUpdDlgType = PatternDlgType.MULTIPLE;
    };

    // 업데이트 창 닫기
    const closeUpdatePatternDlg = () => {
        status.status.selectedPatternId = 0;
        status.status.showPtUpdDlg = false;
    };

    const rankCountReset = () => {
        status.resetRankCount();
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

        for (let i = 0; i < status.status.ptIdList.length; i++) {
            if (user.user.userStatus.has(status.status.ptIdList[i])) {
                const stat = user.user.userStatus.get(status.status.ptIdList[i]);
                switch (stat?.rank) {
                    case RankType.PH_SSSPlus:
                        stat.breakOff ? sssp++ : ssspb++;
                        break;
                    case RankType.PH_SSS:
                        stat.breakOff ? sss++ : sssb++;
                        break;
                    case RankType.PH_SSPlus:
                        stat.breakOff ? ssp++ : sspb++;
                        break;
                    case RankType.PH_SS:
                        stat.breakOff ? ss++ : ssb++;
                        break;
                    case RankType.PH_SPlus:
                        stat.breakOff ? sp++ : spb++;
                        break;
                    case RankType.PH_S:
                        stat.breakOff ? s++ : sb++;
                        break;
                    case RankType.PH_AAAPlus:
                        stat.breakOff ? aaap++ : aaapb++;
                        break;
                    case RankType.PH_AAA:
                        stat.breakOff ? aaa++ : aaab++;
                        break;
                    case RankType.PH_AAPlus:
                        stat.breakOff ? aap++ : aapb++;
                        break;
                    case RankType.PH_AA:
                        stat.breakOff ? aa++ : aab++;
                        break;
                    case RankType.PH_APlus:
                        stat.breakOff ? ap++ : apb++;
                        break;
                    case RankType.PH_A:
                        stat.breakOff ? a++ : ab++;
                        break;
                    case RankType.PH_B:
                        stat.breakOff ? b++ : bb++;
                        break;
                    case RankType.PH_C:
                        stat.breakOff ? c++ : cb++;
                        break;
                    case RankType.PH_D:
                        stat.breakOff ? d++ : db++;
                        break;
                    case RankType.PH_F:
                        stat.breakOff ? f++ : fb++;
                        break;
                }
            }
        }

        status.setRankCount({
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
        })
    };

    const updateData = (ptid: number, rank: RankType, breakOff: boolean) => {
        user.user.userStatus.set(ptid, {rank, breakOff});
        updateRecord(ptid);

        // 창 닫기
        if (status.status.showPtUpdDlg) {
            closeUpdatePatternDlg();
        }
    };

    const updateMultipleData = (rank: RankType, breakOff: boolean) => {
        const checked = document.querySelectorAll("input[id=ptnsel]:checked");
        for (let i = 0; i < checked.length; i++) {
            const ptid = (checked[i] as HTMLInputElement).value;
            user.user.userStatus.set(parseInt(ptid), {rank, breakOff});
            updateRecord(parseInt(ptid));
        }

        // 창 닫기
        if (status.status.showPtUpdDlg) {
            closeUpdatePatternDlg();
        }
    };

    const updateRecord = (ptid: number) => {
        const img = document.getElementById("cs" + ptid);
        const data = user.user.userStatus.get(ptid);

        if (data && img) {
            img.setAttribute("src", `${process.env.PUBLIC_URL}/img/${rankToText(data.rank)}.png`);
        }
    };

    const changeRank = (e: React.FormEvent<HTMLSelectElement>) => {
        status.setUpdateRank(textToRank(e.currentTarget.value));
    };

    return {closeUpdatePatternDlg, updateMultipleData, rankCountReset, updateRankCount, updateData};
};

export default usePatternDialog;
