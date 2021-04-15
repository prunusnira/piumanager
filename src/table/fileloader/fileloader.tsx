import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import txtPIU from "../../piutable/txtpiu";

interface FileLoaderProps {
    lang: string,
    setFileLoaded: () => void,
}

const FileLoader: React.FC<{lang: string}> = ({lang}) => {
    return null;
    /*const [newuser, setNewUserState] = useState(false);
    const [editUserDlgTitle, setEditUserDlgTitle] = useState('');
    const [editUserDlgBtn, setEditUserDlgBtn] = useState('');

    const newUser = () => {
        setNewUserState(!newuser);
        setEditUserDlgTitle((txtPIU.newuserdiv as any)[lang]);
        setEditUserDlgBtn((txtPIU.newuserbtn as any)[lang]);
    }

    const loadUser = () => {
        // 파일 열기 대화상자를 열고 데이터를 가져옴
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert((txtPIU.loadwarn as any)[lang]);
        }

        const fileopen = document.getElementById("fileopen");
        if(fileopen) {
            fileopen.click();
            fileopen.onchange = (e: any) => {
                handleFileSelect(e.target.files[0]);
                // 데이터 열기
                self.setState({
                    loaded: true
                });
                // file loaded state를 true로 하는 메소드
                // 원형: setState({loaded: true})
                 
            }
        }
    }

    const handleFileSelect = (file: File) => {
        const self = this;
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
            if(cur[0] !== "")
                this.state.userstat.set(cur[0], cur[1]);
        }

        this.setState({
            username: userinfo[0],
            userlv: userinfo[1],
            loaded: true
        }, () => {
            this.userLog("load");
        });
    }

    const saveUser = () => {
        let text = "";
        text += this.state.username+","+this.state.userlv+"\n";
        
        const keys = this.state.userstat.keys();
        for(let i = 0; i < this.state.userstat.size; i++) {
            const ckey = keys.next();
            if(ckey.value !== "")
                text += ckey.value + ","+this.state.userstat.get(ckey.value) + "\n";
        }
        
        // 데이터를 새 파일(임시)에 쓰고 다운로드
        const elem = document.createElement("a");
        elem.setAttribute("href", "data:text/plain;charset=utf-8,"+btoa(text));
        elem.setAttribute("download", "piudata_"+this.state.username+"_"+this.unixTimeToText(new Date().getTime())+".csv");
        elem.style.display = 'none';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }

    return (
        <Row>
            <Col xs="12" md="8">
                {(txtPIU.howto1 as any)[lang]}<br/>
                <ol>
                    <li>{(txtPIU.howto2 as any)[lang]}</li>
                    <li>{(txtPIU.howto3 as any)[lang]}</li>
                    <li>{(txtPIU.howto4 as any)[lang]}</li>
                </ol>
            </Col>

            <Col xs="12" md="4">
                <Row>
                    <Col xs="12" className="btn-group-vertical">
                        <Button color="secondary" outline onClick={() => newUser()}>
                            {(txtPIU.newuser as any)[lang]}
                        </Button>
                        <Button color="secondary" outline onClick={() => loadUser()}>
                            {(txtPIU.load as any)[lang]}
                        </Button>
                        <Button color="secondary" outline onClick={() => saveUser()}>
                            {(txtPIU.save as any)[lang]}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );*/
}

export default FileLoader;