import React from "react";
import { Button, Col, Row } from "reactstrap";
import axios from 'axios';
import TxtFileMenu from './txtFilemenu';
import CommonData from "../../piutable/commonData";

interface FileMenuProps {
    lang: string,
    setShowUserDlg: (status: boolean) => void,
    setDlgTitle: (msg: string) => void,
    setDlgBtn: (msg: string) => void,
    setLoaded: (b: boolean) => void,
    userName: string,
    setUserName: (name: string) => void,
    userLv: number,
    setUserLv: (lv: number) => void,
    userStatus: Map<number, string>,
    setUserStatus: (map: Map<number, string>) => void
}

const FileMenu = (props: FileMenuProps) => {
    const newUser = () => {
        props.setShowUserDlg(true);
        props.setDlgTitle((TxtFileMenu.newuserdiv as any)[props.lang]);
        props.setDlgBtn((TxtFileMenu.newuserbtn as any)[props.lang]);
    }

    const loadUser = () => {
        // 파일 열기 대화상자를 열고 데이터를 가져옴
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert((TxtFileMenu.loadwarn as any)[props.lang]);
        }

        const fileopen = document.getElementById("fileopen");
        if(fileopen) {
            fileopen.click();
            fileopen.onchange = (e: any) => {
                // 데이터 열기
                handleFileSelect(e.target.files[0]);
                props.setLoaded(true);
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
                callbackOpenOrigin(result);
            }
        };
        fr.readAsText(file);
    }

    const callbackOpen = (result: string) => {
        const str = atob(result);
        callbackOpenOrigin(str);
    }
    
    const callbackOpenOrigin = (result: string) => {
        const str = result.split("\n");
        
        const userinfo = str[0].split(",");
        
        for(let i = 1; i < str.length; i++) {
            const cur = str[i].split(",");
            if(cur[0] !== "") {
                props.setUserStatus(props.userStatus.set(parseInt(cur[0]), cur[1]));
            }
        }

        props.setUserName(userinfo[0]);
        props.setUserLv(parseInt(userinfo[1]));
        props.setLoaded(true);
        userLog("load");
    }

    const userLog = (type: string) => {
        axios.get(CommonData.dataUrl+'userlog/'+props.userName+'/'+type);
        // 로그 남기는 부분은 없애거나 추후 수정 필요
    }

    const saveUser = () => {
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

    const unixTimeToText = (uxtime: number, onlyday = false) => {
        const now = new Date(uxtime);
        let time = now.getFullYear()
            + ((now.getMonth()+1)<10?'0':'') + (now.getMonth()+1)
            + (now.getDate()<10?'0':'') + now.getDate();
        if(!onlyday) 
            time += "_"
                + now.getHours()
                + (now.getMinutes()<10?'0':'') + now.getMinutes()
                + (now.getSeconds()<10?'0':'') + now.getSeconds();
        return time;
    }

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
                        <Button color="secondary" outline onClick={() => newUser()}>
                            {(TxtFileMenu.newuser as any)[props.lang]}
                        </Button>
                        <Button color="secondary" outline onClick={() => loadUser()}>
                            {(TxtFileMenu.load as any)[props.lang]}
                        </Button>
                        <Button color="secondary" outline onClick={() => saveUser()}>
                            {(TxtFileMenu.save as any)[props.lang]}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default FileMenu;