import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import IntegratedStore from "../../../mobx/integratedStore";
import { UserDlgType } from "../../../data/userDlgType";
import { observer } from "mobx-react";

import TxtUserDlgKo from "../../../text/table/userDlg/txtUserDlg-ko";
import TxtUserDlgJp from "../../../text/table/userDlg/txtUserDlg-jp";
import TxtUserDlgCn from "../../../text/table/userDlg/txtUserDlg-cn";
import TxtUserDlgEn from "../../../text/table/userDlg/txtUserDlg-en";
import { Button } from "../../../styled/common.style";

interface Props {
    userLog: (name: string, type: string) => void;
    setAllowUserNew: (b: boolean) => void;
}

const UserDialog = observer((props: Props) => {
    const { user, status, language } = IntegratedStore;

    const TxtUserDlg =
        language.language === "ko"
            ? TxtUserDlgKo
            : language.language === "jp"
            ? TxtUserDlgJp
            : language.language === "cn"
            ? TxtUserDlgCn
            : TxtUserDlgEn;

    const [dlgHeader, setDlgHeader] = useState("");
    const [dlgButton, setDlgButton] = useState("");

    useEffect(() => {
        switch (status.status.userDlgType) {
            case UserDlgType.NEWUSER:
                setDlgHeader(TxtUserDlg.newUserDiv);
                setDlgButton(TxtUserDlg.newUserBtn);
                break;
            case UserDlgType.EDITUSER:
                setDlgHeader(TxtUserDlg.editUserDiv);
                setDlgButton(TxtUserDlg.editUserBtn);
                break;
        }
    }, [status.status.userDlgType, language.language]);

    const nameInpRef = React.createRef<HTMLInputElement>();
    const lvInpRef = React.createRef<HTMLInputElement>();

    const nameValidCheck = () => {
        const regex = /^[a-zA-Z0-9]+$/;
        const name = nameInpRef.current;
        if (name && regex.test(name.value) !== true)
            name.value = name.value.replace(/[^a-zA-Z0-9]+/, "");
    };

    const closeDialog = () => {
        status.status.showUserDialog = false;
        props.setAllowUserNew(false);
    };

    const addNewUser = () => {
        // 새 유저 UI에서 이름과 레벨 정보를 입력
        // username과 userlv를 업데이트하고 난이도 선택 버튼 표시
        const name = nameInpRef.current;
        const lv = lvInpRef.current;

        if (name && lv) {
            if (name.value !== "" && lv.value !== "") {
                user.user.userName = name.value;
                user.user.userLv = parseInt(lv.value);
                status.status.isUserLoaded = true;
                props.userLog(name.value, "new");
                status.status.showUserDialog = false;
            } else {
                alert("Not enough info");
            }
        }
    };

    return (
        <Modal isOpen={status.status.showUserDialog}>
            <ModalHeader>{dlgHeader}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="4">User Name</Col>
                    <Col xs="8">
                        <input
                            ref={nameInpRef}
                            className="form-control"
                            type="text"
                            id="newname"
                            placeholder="NAME"
                            defaultValue={user.user.userName}
                            onKeyUp={() => nameValidCheck()}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">User Level</Col>
                    <Col xs="8">
                        <input
                            ref={lvInpRef}
                            className="form-control"
                            type="number"
                            min="1"
                            step="1"
                            id="newlv"
                            defaultValue={user.user.userLv}
                            onKeyPress={(event) => event.charCode >= 48 && event.charCode <= 57}
                            placeholder="LEVEL"
                        />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" data-testid="btnChangeUser" onClick={() => addNewUser()}>
                    {dlgButton}
                </Button>
                <Button color="secondary" onClick={() => closeDialog()}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
});

export default UserDialog;
