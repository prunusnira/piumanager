import React, { useEffect, useRef } from "react";
import axios from "axios";
import ShareDialog from "./shareDialog/shareDialog";
import UserDialog from "./userDialog/userDialog";
import TableWrapper from "./tableinner/tableWrapper";
import CommonData from "../../data/commonData";
import UserResetModal from "./userResetModal/resetModal";
import SaveBeforeLoadDlg from "./saveBeforeLoadDlg/saveBeforeLoadDlg";
import useFileMenu from "./filemenu/useFilemenu";
import FilemenuPres from "./filemenu/filemenuPres";
import TableMenuPres from "./tablemenu/tableMenuPres";
import useTableData from "./useTableData";
import useTable from "./tableinner/useTable";
import IntegratedStore from "../../mobx/integratedStore";
import usePatternDialog from "./patternDialog/usePatternDialog";
import PTUpdateDlgPres from "./patternDialog/ptUpdateDlgPres";
import useResetModal from "./userResetModal/useResetModal";
import { textToRank } from "../../data/rankTextConvert";
import { observer } from "mobx-react";
import useTableMenu from "./tablemenu/useTableMenu";
import { PIUTableWrapper } from "./piuTable.style";
import {UserData} from "../../data/userType";

const PIUTable = observer(() => {
    const { user, status } = IntegratedStore;

    // 파일열기 ref
    const fileOpenRef = useRef<HTMLInputElement>(null);

    /**
     * 파일 메뉴
     */
    const [
        checkUserBeforeNew,
        checkUserBeforeLoad,
        checkUserBeforeSave,
        setAllowUserNew,
        setAllowUserLoad,

        // 분석데이터 - userDataAnalyze 파라미터
        analyzeData,
        analyzeType,
    ] = useFileMenu(fileOpenRef);

    /**
     * 테이블 메뉴
     */

    useEffect(() => {
        userDataAnalyze(analyzeData, analyzeType);
    }, [analyzeData]);

    /**
     * Table Menu
     */

    const [selDiffSingle, selDiffDouble, selDiffCoop, diffSelReset] = useTableMenu();
    const [getPatterns, resetTable] = useTableData();

    useEffect(() => {
        getPatterns();
        diffSelReset();
    }, [status.status.patternLv, status.status.patternType]);

    /**
     * Table
     */
    const [scrShot, shareURL] = useTable();

    /**
     * Dialogs
     */
    const {closeUpdatePatternDlg, updateMultipleData, rankCountReset, updateRankCount, updateData} =
        usePatternDialog();

    const [closeUserResetDlg, runUserReset] = useResetModal(
        resetTable,
        setAllowUserNew,
        setAllowUserLoad
    );

    const userDataAnalyze = (result: string, type: string) => {
        if (result !== "") {
            const str = result.split("\n");

            const userinfo = str[0].split(",");

            for (let i = 1; i < str.length; i++) {
                const cur = str[i].split(",");
                if (cur[0] !== "") {
                    if(cur.length === 2) {
                        user.user.userStatus.set(parseInt(cur[0]), {rank: textToRank(cur[1]), breakOff: false, lv: -1, side: -1});
                    }
                    else {
                        const json = JSON.parse(cur.join(','))
                        user.user.userStatus.set(json.ptid, {
                            rank: json.rank,
                            breakOff: json.breakOff,
                            lv: json.lv,
                            side: json.side,
                        });
                    }
                }
            }

            user.setUserName(userinfo[0]);
            status.setUserLoaded(true);
            userLog(userinfo[0], type);
            setAllowUserLoad(false);
        }
    };

    const userLog = (name: string, type: string) => {
        axios.post(`${CommonData.dataUrl}userlog/${name}/${type}`);
    };

    return (
        <>
            <PIUTableWrapper>
                <FilemenuPres
                    checkUserBeforeNew={checkUserBeforeNew}
                    checkUserBeforeLoad={checkUserBeforeLoad}
                    checkUserBeforeSave={checkUserBeforeSave}
                />

                <TableMenuPres
                    selDiffSingle={selDiffSingle}
                    selDiffDouble={selDiffDouble}
                    selDiffCoop={selDiffCoop}
                />

                <TableWrapper scrShot={scrShot} shareURL={shareURL} />
            </PIUTableWrapper>

            <input
                id="fileopen"
                accept=".csv"
                type="file"
                name="fileopen"
                style={{ display: "none" }}
                ref={fileOpenRef}
            />

            <UserResetModal closeUserResetDlg={closeUserResetDlg} runUserReset={runUserReset} />

            <SaveBeforeLoadDlg />

            <UserDialog userLog={userLog} setAllowUserNew={setAllowUserNew} />

            {/** Pattern Update Dialog */}
            <PTUpdateDlgPres
                updateData={updateData}
                updateMultipleData={updateMultipleData}
                closeUpdatePatternDlg={closeUpdatePatternDlg}
                rankCountReset={rankCountReset}
                updateRankCount={updateRankCount}
            />

            <ShareDialog />
        </>
    );
});

export default PIUTable;
