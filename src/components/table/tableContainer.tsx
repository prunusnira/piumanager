import React, { useEffect, useRef } from "react"
import { CardBody } from "reactstrap"
import axios from 'axios'
import ShareDialog from "./shareDialog/shareDialog"
import UserDialog from "./userDialog/userDialog"
import TableWrapper from "./tableinner/tableWrapper"
import CommonData from "./data/commonData"
import UserResetModal from "./userResetModal/resetModal"
import SaveBeforeLoadDlg from "./saveBeforeLoadDlg/saveBeforeLoadDlg"
import useFileMenu from "./filemenu/useFilemenu"
import FilemenuPres from "./filemenu/filemenuPres"
import TableMenuPres from "./tablemenu/tableMenuPres"
import useTableData from "./useTableData"
import useTable from "./tableinner/useTable"
import IntegratedStore from "../../mobx/integratedStore"
import usePatternDialog from "./patternDialog/usePatternDialog"
import PTUpdateDlgPres from "./patternDialog/ptUpdateDlgPres"
import useResetModal from "./userResetModal/useResetModal"
import { textToRank } from "./data/rankTextConvert"
import {observer} from 'mobx-react'
import useTableMenu from "./tablemenu/useTableMenu"

const TableContainer = observer(() => {
    const {user, status} = IntegratedStore

    // 파일열기 ref
    const fileOpenRef = useRef<HTMLInputElement>(null)

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
    ] = useFileMenu(fileOpenRef)

    /**
     * 테이블 메뉴
     */
    
    useEffect(() => {
        userDataAnalyze(analyzeData, analyzeType)
    }, [analyzeData])

    /**
     * Table Menu
     */

    const [getPatterns, resetTable] = useTableData()

    useEffect(() => {
        getPatterns()
    }, [status.status.patternType, status.status.patternLv])

    /**
     * Table
     */
    const [scrShot, shareURL] = useTable()
    useTableMenu()


    /**
     * Dialogs
     */
     const [
        closeUpdatePatternDlg, updateMultipleData,
        rankCountReset, updateRankCount, updateData,
    ] = usePatternDialog()

    const [
        closeUserResetDlg, runUserReset
    ] = useResetModal(resetTable, setAllowUserNew, setAllowUserLoad)


    const userDataAnalyze = (result: string, type: string) => {
        if(result !== '') {
            const str = result.split("\n")
            
            const userinfo = str[0].split(",")
            
            for(let i = 1; i < str.length; i++) {
                const cur = str[i].split(",")
                if(cur[0] !== "") {
                    user.user.userStatus.set(parseInt(cur[0]), textToRank(cur[1]))
                }
            }
    
            user.user.userName = userinfo[0]
            user.user.userLv = parseInt(userinfo[1])
            status.status.isUserLoaded = true
            userLog(userinfo[0], type)
            setAllowUserLoad(false)
        }
    }

    const userLog = (name: string, type: string) => {
        axios.post(`${CommonData.dataUrl}userlog/${name}/${type}`)
    }

    return (
        <>
            <CardBody>
                <FilemenuPres
                    checkUserBeforeNew={checkUserBeforeNew}
                    checkUserBeforeLoad={checkUserBeforeLoad}
                    checkUserBeforeSave={checkUserBeforeSave} />

                <TableMenuPres />

                <TableWrapper
                    scrShot={scrShot}
                    shareURL={shareURL} />
            </CardBody>

            <input id="fileopen" accept=".csv" type="file"
                name="fileopen" style={{display:"none"}}
                ref={fileOpenRef} />

            <UserResetModal
                closeUserResetDlg={closeUserResetDlg}
                runUserReset={runUserReset} />

            <SaveBeforeLoadDlg />

            <UserDialog
                userLog={userLog}
                setAllowUserNew={setAllowUserNew} />

            {/** Pattern Update Dialog */}
            <PTUpdateDlgPres
                updateData={updateData}
                updateMultipleData={updateMultipleData}
                closeUpdatePatternDlg={closeUpdatePatternDlg}
                rankCountReset={rankCountReset}
                updateRankCount={updateRankCount} />

            <ShareDialog />
        </>
    )
})

export default TableContainer