import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {apiCheckSaved} from "../api/apiTable"
import {unixTimeToText} from "../tools/unixTimeToText"
import {ResetType} from "../data/resetType"
import {UserDlgType} from "../data/userDlgType"
import TxtFileMenuKo from "../text/table/filemenu/txtFilemenu-ko"
import TxtFileMenuJp from "../text/table/filemenu/txtFilemenu-jp"
import TxtFileMenuCn from "../text/table/filemenu/txtFilemenu-cn"
import TxtFileMenuEn from "../text/table/filemenu/txtFilemenu-en"
import {textToRank} from "../tools/rankTextConvert";
import {apiUserLog} from "../api/apiUserLog";
import {atomUser} from "../recoil/user";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {atomLanguage} from "../recoil/language";
import {atomSaveAlertDialog, atomStatus, atomUserDialog, atomUserResetDialog} from "../recoil/status";

const useFileMenu = (
    fileOpenRef: React.RefObject<HTMLInputElement>
) => {
    const language = useRecoilValue(atomLanguage)
    const [user, setUser] = useRecoilState(atomUser);
    const [status, setStatus] = useRecoilState(atomStatus);
    const setResetDialog = useSetRecoilState(atomUserResetDialog);
    const setSaveDialog = useSetRecoilState(atomSaveAlertDialog);
    const setUserDialog = useSetRecoilState(atomUserDialog);

    // 유저 상태 스테이터스 관리
    const [allowUserNew, setAllowUserNew] = useState(false)
    const [allowUserLoad, setAllowUserLoad] = useState(false)
    const [allowUserSave, setAllowUserSave] = useState(false)
    
    // 분석 데이터 설정
    const [analyzeData, setAnalyzeData] = useState('')
    const [analyzeType, setAnalyzeType] = useState('')
    
    // URL Parameter
    const {savedId} = useParams<{ savedId: string | undefined }>()
            
    // 최초 실행 시 실행되는 effect, constructor 대신에 처리
    useEffect(() => {
        if(savedId !== undefined) {
            // DB에 공유용으로 저장된 값을 불러와서 데이터 표시
            apiCheckSaved(savedId)
            .then(d => {
                setStatus({
                    ...status,
                    isShareData: true
                })
                setAnalyzeData(decodeURIComponent(atob(d.data[0].saved)))
                setAnalyzeType('saved')
            })
        }
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

    useEffect(() => {
        userDataAnalyze(analyzeData, analyzeType);
    }, [analyzeData]);

    const TxtFileMenu =
        language === 'ko' ? TxtFileMenuKo :
        language === 'jp' ? TxtFileMenuJp :
        language === 'cn' ? TxtFileMenuCn : TxtFileMenuEn

    // 새 유저 만들기 전에 검사
    const checkUserBeforeNew = () => {
        // 사용자가 로드 된 상태 -> 알림 modal 열기
        if(status.isUserLoaded) {
            setStatus({
                ...status,
                resetType: ResetType.NEW,
            })
            setResetDialog(true);
        }
        else {
            setAllowUserNew(true)
        }
    }

    // 유저 불러오기 전에 검사
    const checkUserBeforeLoad = () => {
        // 사용자가 로드 된 상태 -> 알림 modal 열기
        if(status.isUserLoaded) {
            setStatus({
                ...status,
                resetType: ResetType.LOAD,
            })
            setResetDialog(true);
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
        if(status.isUserLoaded) {
            setAllowUserSave(true)
        }
        else {
            setSaveDialog(true);
        }
    }

    // 신규 사용자 생성
    const newUser = () => {
        setStatus({
            ...status,
            userDlgType: UserDlgType.NEWUSER
        })
        setUserDialog(true);
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
                setStatus({
                    ...status,
                    isUserLoaded: true
                })
                e.target.value=''
                fileOpen.value = ''
            }
        }
    }

    const handleFileSelect = (file: File) => {
        const fr = new FileReader();
        fr.onload = function(e: any) {
            const result: string = e.target.result
            const str = decodeURIComponent(atob(result))
            setAnalyzeData(str)
            setAnalyzeType('load')
        }
        fr.readAsText(file)
    }

    const saveUser = () => {
        setAllowUserSave(false)
        let text = ""
        text += user.userName+"," + user.userLv + "\n"
        
        const keys = user.userPattern.keys()
        for(let i = 0; i < user.userPattern.size; i++) {
            const ckey = keys.next()
            if(ckey.value !== "") {
                const data = user.userPattern.get(ckey.value)
                console.log(ckey.value, data?.rank, data?.breakOff)
                text += `{"ptid":${ckey.value},"rank":${data?.rank},"breakOff":${data?.breakOff ? '1' : '0'},"lv":${data?.lv},"side":${data?.side}}\n`
            }
        }
        
        // 데이터를 새 파일(임시)에 쓰고 다운로드
        const elem = document.createElement("a")
        elem.setAttribute("href", "data:text/plain;charset=utf-8,"+btoa(encodeURIComponent(text)))
        elem.setAttribute("download", `piudata_${user.userName}_${unixTimeToText(new Date().getTime())}.csv`)
        elem.style.display = 'none'
        document.body.appendChild(elem)
        elem.click()
        document.body.removeChild(elem)
    }

    const userDataAnalyze = (result: string, type: string) => {
        if (result !== "") {
            const str = result.split("\n");

            const userinfo = str[0].split(",");
            const record = user.userPattern;

            for (let i = 1; i < str.length; i++) {
                const cur = str[i].split(",");
                if (cur[0] !== "") {
                    if(cur.length === 2) {
                        record.set(parseInt(cur[0]), {rank: textToRank(cur[1]), breakOff: false, lv: -1, side: -1});
                    }
                    else {
                        const json = JSON.parse(cur.join(','))
                        record.set(json.ptid, {
                            rank: json.rank,
                            breakOff: json.breakOff,
                            lv: json.lv,
                            side: json.side,
                        });
                    }
                }
            }

            setUser({
                ...user,
                userName: userinfo[0],
                userPattern: record
            });
            setStatus({
                ...status,
                isUserLoaded: true
            })
            apiUserLog(userinfo[0], type);
            setAllowUserLoad(false);
        }
    };

    return {
        checkUserBeforeNew,
        checkUserBeforeLoad,
        checkUserBeforeSave,
        setAllowUserNew,
        setAllowUserLoad,
    }
}

export default useFileMenu