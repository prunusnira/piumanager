import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiCheckSaved } from "../../../api/apiTable"
import IntegratedStore from "../../../mobx/integratedStore"
import { unixTimeToText } from "../tool"
import { ResetType } from "../data/resetType"
import { UserDlgType } from "../data/userDlgType"

import TxtFileMenuKo from "../../../text/table/filemenu/txtFilemenu-ko"
import TxtFileMenuJp from "../../../text/table/filemenu/txtFilemenu-jp"
import TxtFileMenuCn from "../../../text/table/filemenu/txtFilemenu-cn"
import TxtFileMenuEn from "../../../text/table/filemenu/txtFilemenu-en"

type FileMenuReturn = [
    () => void,
    () => void,
    () => void,
    (b: boolean) => void,
    (b: boolean) => void,
    string,
    string,
]

interface MatchProps {
    savedId: string
}

const useFileMenu = (
    fileOpenRef: React.RefObject<HTMLInputElement>
): FileMenuReturn => {
    // 유저 상태 스테이터스 관리
    const [allowUserNew, setAllowUserNew] = useState(false)
    const [allowUserLoad, setAllowUserLoad] = useState(false)
    const [allowUserSave, setAllowUserSave] = useState(false)
    
    // 분석 데이터 설정
    const [analyzeData, setAnalyzeData] = useState('')
    const [analyzeType, setAnalyzeType] = useState('')
    
    // URL Parameter
    const {savedId} = useParams<MatchProps>()
            
    // 최초 실행 시 실행되는 effect, constructor 대신에 처리
    useEffect(() => {
        if(savedId !== undefined) {
            // DB에 공유용으로 저장된 값을 불러와서 데이터 표시
            apiCheckSaved(savedId)
            .then(d => {
                status.status.isShareData = true
                setAnalyzeData(atob(d.data[0].saved))
                setAnalyzeType('saved')
            })
        }
    }, [])

    useEffect(() => {
        (window as any).callbackOpen = callbackOpen;
    }, [])

    useEffect(() => {
        if(allowUserNew) {
            newUser()
        }
    }, [allowUserNew])
    
    useEffect(() => {
        if(allowUserLoad) {
            loadUser()
        }
    }, [allowUserLoad])

    useEffect(() => {
        if(allowUserSave) {
            saveUser()
        }
    }, [allowUserSave])

    const {language, status, user} = IntegratedStore

    const TxtFileMenu =
        language.language === 'ko' ? TxtFileMenuKo :
        language.language === 'jp' ? TxtFileMenuJp :
        language.language === 'cn' ? TxtFileMenuCn : TxtFileMenuEn

    // 새 유저 만들기 전에 검사
    const checkUserBeforeNew = () => {
        // 사용자가 로드 된 상태 -> 알림 modal 열기
        if(status.status.isUserLoaded) {
            status.status.resetType = ResetType.NEW
            status.status.showUserResetDialog = true
        }
        else {
            setAllowUserNew(true)
        }
    }

    // 유저 불러오기 전에 검사
    const checkUserBeforeLoad = () => {
        // 사용자가 로드 된 상태 -> 알림 modal 열기
        if(status.status.isUserLoaded) {
            status.status.resetType = ResetType.LOAD
            status.status.showUserResetDialog = true
        }
        else {
            // 불러오기
            setAllowUserLoad(true)
        }
    }

    // 저장하기 전에 검사
    const checkUserBeforeSave = () => {
        // 사용자가 로드 된 상태 -> 그냥 저장
        // 아니면 -> 사용자 정보가 있어야 저장 가능하다고 메시지 표시
        if(status.status.isUserLoaded) {
            setAllowUserSave(true)
        }
        else {
            status.status.showSaveBeforeLoadDialog = true
        }
    }

    // 신규 사용자 생성
    const newUser = () => {
        status.status.showUserDialog = true
        status.status.userDlgType = UserDlgType.NEWUSER
    }

    const loadUser = () => {
        setAllowUserLoad(false)
        // 파일 열기 대화상자를 열고 데이터를 가져옴
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert(TxtFileMenu.loadwarn)
        }

        const fileOpen = fileOpenRef.current
        if(fileOpen) {
            fileOpen.click()
            fileOpen.onchange = (e: any) => {
                // 데이터 열기
                handleFileSelect(e.target.files[0])
                status.status.isUserLoaded = true
                e.target.value=''
                fileOpen.value = ''
            }
        }
    }

    const handleFileSelect = (file: File) => {
        const fr = new FileReader();
        fr.onload = function(e: any) {
            const result: string = e.target.result
            
            if(!result.includes(",")) {
                callbackOpen(result)
            }
            else {
                setAnalyzeData(result)
                setAnalyzeType('load')
            }
        }
        fr.readAsText(file)
    }

    const callbackOpen = (result: string) => {
        const str = atob(result)
        setAnalyzeData(str)
        setAnalyzeType('load')
    }

    const saveUser = () => {
        setAllowUserSave(false)
        let text = ""
        text += user.user.userName+"," + user.user.userLv + "\n"
        
        const keys = user.user.userStatus.keys()
        for(let i = 0; i < user.user.userStatus.size; i++) {
            const ckey = keys.next()
            if(ckey.value !== "")
                text += ckey.value + "," + user.user.userStatus.get(ckey.value) + "\n"
        }
        
        // 데이터를 새 파일(임시)에 쓰고 다운로드
        const elem = document.createElement("a")
        elem.setAttribute("href", "data:text/plain;charset=utf-8,"+btoa(text))
        elem.setAttribute("download", `piudata_${user.user.userName}_${unixTimeToText(new Date().getTime())}.csv`)
        elem.style.display = 'none'
        document.body.appendChild(elem)
        elem.click()
        document.body.removeChild(elem)
    }

    return [
        checkUserBeforeNew,
        checkUserBeforeLoad,
        checkUserBeforeSave,
        setAllowUserNew,
        setAllowUserLoad,

        // 분석데이터 - userDataAnalyze 파라미터
        analyzeData,
        analyzeType,
    ]
}

export default useFileMenu