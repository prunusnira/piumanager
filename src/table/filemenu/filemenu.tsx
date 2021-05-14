import React, { useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import TxtFileMenu from './txtFilemenu';
import {unixTimeToText} from '../tool';

interface FileMenuProps {
    lang: string,
    fileOpenRef: React.RefObject<HTMLInputElement>,

    allowUserLoad: boolean,
    allowUserSave: boolean,
    setAllowUserLoad: (e: boolean) => void,
    setAllowUserSave: (e: boolean) => void,
    checkUserBeforeNew: () => void,
    checkUserBeforeLoad: () => void,
    checkUserBeforeSave: () => void,
    userDataAnalyze: (data: string, type: string) => void,

    setShowUserDlg: (status: boolean) => void,
    setDlgTitle: (msg: string) => void,
    setDlgBtn: (msg: string) => void,
    setLoaded: (b: boolean) => void,

    userName: string,
    userLv: number,
    userStatus: Map<number, string>,
    setUserName: (name: string) => void,
    setUserLv: (lv: number) => void,
    setUserStatus: (map: Map<number, string>) => void,

    isSavedData: boolean
}

const FileMenu = (props: FileMenuProps) => {
    const loadUser = () => {
        props.setAllowUserLoad(false)
        // 파일 열기 대화상자를 열고 데이터를 가져옴
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert((TxtFileMenu.loadwarn as any)[props.lang]);
        }

        const fileOpen = props.fileOpenRef.current
        if(fileOpen) {
            fileOpen.click()
            fileOpen.onchange = (e: any) => {
                // 데이터 열기
                handleFileSelect(e.target.files[0])
                props.setLoaded(true)
                e.target.value=''
                fileOpen.value = ''
            }
        }
    }

    const handleFileSelect = (file: File) => {
        const fr = new FileReader();
        fr.onload = function(e: any) {
            const result: string = e.target.result;
            
            if(!result.includes(",")) {
                callbackOpen(result);
            }
            else {
                props.userDataAnalyze(result, "load");
            }
        };
        fr.readAsText(file);
    }

    const callbackOpen = (result: string) => {
        const str = atob(result);
        props.userDataAnalyze(str, "load");
    }

    const saveUser = () => {
        props.setAllowUserSave(false)
        let text = "";
        text += props.userName+"," + props.userLv + "\n";
        
        const keys = props.userStatus.keys();
        for(let i = 0; i < props.userStatus.size; i++) {
            const ckey = keys.next();
            if(ckey.value !== "")
                text += ckey.value + "," + props.userStatus.get(ckey.value) + "\n";
        }
        
        // 데이터를 새 파일(임시)에 쓰고 다운로드
        const elem = document.createElement("a");
        elem.setAttribute("href", "data:text/plain;charset=utf-8,"+btoa(text));
        elem.setAttribute("download", "piudata_" + props.userName + "_" + unixTimeToText(new Date().getTime())+".csv");
        elem.style.display = 'none';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }

    useEffect(() => {
        (window as any).callbackOpen = callbackOpen;
    }, []);

    useEffect(() => {
        if(props.allowUserLoad) {
            loadUser()
        }
    }, [props.allowUserLoad])

    useEffect(() => {
        if(props.allowUserSave) {
            saveUser()
        }
    }, [props.allowUserSave])

    if(props.isSavedData) {
        return (
            <Row>
                <Col xs='12' className='text-center'>
                    <h4>{(TxtFileMenu.sharedata as any)[props.lang]}</h4>
                </Col>
            </Row>
        );
    }
    else {
        return (
            <Row>
                <Col xs="12" md="8">
                    {(TxtFileMenu.howto1 as any)[props.lang]}<br/>
                    <ol>
                        <li>{(TxtFileMenu.howto2 as any)[props.lang]}</li>
                        <li>{(TxtFileMenu.howto3 as any)[props.lang]}</li>
                        <li>{(TxtFileMenu.howto4 as any)[props.lang]}</li>
                    </ol>
                </Col>

                <Col xs="12" md="4">
                    <Row>
                        <Col xs="12" className="btn-group-vertical">
                            <Button color="secondary" onClick={props.checkUserBeforeNew}>
                                {(TxtFileMenu.newuser as any)[props.lang]}
                            </Button>
                            <Button color="secondary" onClick={props.checkUserBeforeLoad}>
                                {(TxtFileMenu.load as any)[props.lang]}
                            </Button>
                            <Button color="secondary" onClick={props.checkUserBeforeSave}>
                                {(TxtFileMenu.save as any)[props.lang]}
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default FileMenu;