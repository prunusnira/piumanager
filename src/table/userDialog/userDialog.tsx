import React, {Component} from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col
} from 'reactstrap';

interface Props {
    title: string,
    curname: string,
    curlv: number,
    button: string,
    showUserDlg: boolean,

    setUserName: (name: string) => void,
    setUserLv: (lv: number) => void,
    setLoaded: (is: boolean) => void,

    newUser: () => void,
    setShowUserDlg: (b: boolean) => void,
}

const UserDialog = (props: Props) => {
    const nameInpRef = React.createRef<HTMLInputElement>();
    const lvInpRef = React.createRef<HTMLInputElement>();

    const nameValidCheck = () => {
        const regex = /^[a-zA-Z0-9]+$/;
        const name = nameInpRef.current;
        if (name && regex.test(name.value) !== true)
            name.value = name.value.replace(/[^a-zA-Z0-9]+/, '');
    }

    const addNewUser = () => {
        // 새 유저 UI에서 이름과 레벨 정보를 입력
        // username과 userlv를 업데이트하고 난이도 선택 버튼 표시
        const name = nameInpRef.current;
        const lv = lvInpRef.current;
        
        if(name && lv) {
            if(name.value !== "" && lv.value !== "") {
                props.setUserName(name.value);
                props.setUserLv(parseInt(lv.value));
                props.setLoaded(true);
                closeDialog();
            }
            else {
                alert("Not enough info");
            }
        }
    }

    const closeDialog = () => {
        props.setShowUserDlg(false);
    }

    return (
        <Modal isOpen={props.showUserDlg}>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="4">
                        User Name
                    </Col>
                    <Col xs="8">
                        <input ref={nameInpRef} className='form-control'
                            type='text' id='newname' placeholder='NAME'
                            defaultValue={props.curname}
                            onKeyUp={() => nameValidCheck()} />
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">
                        User Level
                    </Col>
                    <Col xs="8">
                        <input ref={lvInpRef} className='form-control'
                            type='number' min='1' step='1' id='newlv'
                            defaultValue={props.curlv}
                            onKeyPress={(event) => (event.charCode >= 48 && event.charCode <= 57)}
                            placeholder='LEVEL'/>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" outlined="true" onClick={() => closeDialog()}>
                    Close
                </Button>
                <Button color="secondary" outlined="true" onClick={() => addNewUser()}>
                    {props.button}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UserDialog;