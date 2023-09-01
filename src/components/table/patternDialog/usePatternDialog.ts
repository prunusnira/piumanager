import { useEffect } from "react";
import IntegratedStore from "../../../mobx/integratedStore";
import { rankToText, textToRank } from "../data/rankTextConvert";
import { RankType } from "../data/rankType";
import { PatternDlgType } from "../data/patternDlgType";

type PatternDialogReturn = [
    () => void,
    (rank: RankType) => void,
    () => void,
    () => void,
    (ptid: number, rank: RankType) => void
];

const usePatternDialog = (): PatternDialogReturn => {
    const { status, user } = IntegratedStore;

    // 테이블 데이터 변경 이후에 수행하는 effect
    useEffect(() => {
        for (let i = 0; i < status.status.ptIdList.length; i++) {
            const ptid = status.status.ptIdList[i];

            if (user.user.userStatus.has(ptid)) {
                const rank = user.user.userStatus.get(ptid);
                updateData(ptid, rank!);
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
        let ranksss = 0;
        let rankss = 0;
        let ranks = 0;
        let ranka = 0;
        let rankao = 0;
        let rankbcdo = 0;
        let rankf = 0;
        let rankbcd = 0;

        for (let i = 0; i < status.status.ptIdList.length; i++) {
            if (user.user.userStatus.has(status.status.ptIdList[i])) {
                switch (user.user.userStatus.get(status.status.ptIdList[i])) {
                    case RankType.SSS:
                        ranksss++;
                        break;
                    case RankType.SS:
                        rankss++;
                        break;
                    case RankType.S:
                        ranks++;
                        break;
                    case RankType.Aon:
                        ranka++;
                        break;
                    case RankType.Aoff:
                        rankao++;
                        break;
                    case RankType.BCDoff:
                        rankbcdo++;
                        break;
                    case RankType.F:
                        rankf++;
                        break;
                    case RankType.BCDon:
                        rankbcd++;
                        break;
                }
            }
        }

        status.status.rankcount.sss = ranksss;
        status.status.rankcount.ss = rankss;
        status.status.rankcount.s = ranks;
        status.status.rankcount.aon = ranka;
        status.status.rankcount.aoff = rankao;
        status.status.rankcount.bcdon = rankbcd;
        status.status.rankcount.bcdoff = rankbcdo;
        status.status.rankcount.f = rankf;
        status.status.rankcount.np =
            status.status.ptIdList.length -
            ranksss -
            rankss -
            ranks -
            ranka -
            rankao -
            rankbcd -
            rankbcdo -
            rankf;
    };

    const updateData = (ptid: number, rank: RankType) => {
        user.user.userStatus.set(ptid, rank);
        updateRecord(ptid);

        // 창 닫기
        if (status.status.showPtUpdDlg) {
            closeUpdatePatternDlg();
        }
    };

    const updateMultipleData = (rank: RankType) => {
        const checked = document.querySelectorAll("input[id=ptnsel]:checked");
        for (let i = 0; i < checked.length; i++) {
            const ptid = (checked[i] as HTMLInputElement).value;
            user.user.userStatus.set(parseInt(ptid), rank);
            updateRecord(parseInt(ptid));
        }

        // 창 닫기
        if (status.status.showPtUpdDlg) {
            closeUpdatePatternDlg();
        }
    };

    const updateRecord = (ptid: number) => {
        const img = document.getElementById("cs" + ptid);
        const rankval = user.user.userStatus.get(ptid);

        let rank = "";
        rank = rankToText(rankval!);

        if (img) {
            img.setAttribute("src", `${process.env.PUBLIC_URL}/img/grade_${rank}.png`);
        }
    };

    const changeRank = (e: React.FormEvent<HTMLSelectElement>) => {
        status.status.updateRank = textToRank(e.currentTarget.value);
    };

    return [closeUpdatePatternDlg, updateMultipleData, rankCountReset, updateRankCount, updateData];
};

export default usePatternDialog;
