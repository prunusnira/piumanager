import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from "reactstrap";
import { UserDlgType } from "../data/userDlgType";
import { observer } from "mobx-react";
import TxtUserDlgKo from "../text/table/userDlg/txtUserDlg-ko";
import TxtUserDlgJp from "../text/table/userDlg/txtUserDlg-jp";
import TxtUserDlgCn from "../text/table/userDlg/txtUserDlg-cn";
import TxtUserDlgEn from "../text/table/userDlg/txtUserDlg-en";
import { Button } from "../styled/common.style";
import {useRecoilState, useRecoilValue} from "recoil";
import {atomLanguage} from "../recoil/language";
import {atomUser} from "../recoil/user";
import {atomStatus, atomUserDialog} from "../recoil/status";

interface Props {
    setAllowUserNew: (b: boolean) => void;
}

const DialogUserEdit = observer(({setAllowUserNew}: Props) => {
    const language = useRecoilValue(atomLanguage);
    const [user, setUser] = useRecoilState(atomUser);
    const [status, setStatus] = useRecoilState(atomStatus);
    const [showUserDialog, setUserDialog] = useRecoilState(atomUserDialog);

    const TxtUserDlg =
        language === "ko"
            ? TxtUserDlgKo
            : language === "jp"
            ? TxtUserDlgJp
            : language === "cn"
            ? TxtUserDlgCn
            : TxtUserDlgEn;

    const [dlgHeader, setDlgHeader] = useState("");
    const [dlgButton, setDlgButton] = useState("");

    useEffect(() => {
        switch (status.userDlgType) {
            case UserDlgType.NEWUSER:
                setDlgHeader(TxtUserDlg.newUserDiv);
                setDlgButton(TxtUserDlg.newUserBtn);
                break;
            case UserDlgType.EDITUSER:
                setDlgHeader(TxtUserDlg.editUserDiv);
                setDlgButton(TxtUserDlg.editUserBtn);
                break;
        }
    }, [status.userDlgType, language]);

    const nameInpRef = React.createRef<HTMLInputElement>();

    const nameValidCheck = () => {
        const regex = /^[a-zA-Z0-9]+$/;
        const name = nameInpRef.current;
        if (name && regex.test(name.value) !== true)
            name.value = name.value.replace(/[^a-zA-Z0-9]+/, "");
    };

    const closeDialog = () => {
        setUserDialog(false);
        setAllowUserNew(false);
    };

    const addNewUser = () => {
        // 새 유저 UI에서 이름과 레벨 정보를 입력
        // username과 userlv를 업데이트하고 난이도 선택 버튼 표시
        const name = nameInpRef.current;

        if (name) {
            if (name.value !== "") {
                setUser({
                    ...user,
                    userName: name.value,
                    userLv: 0,
                })
                setStatus({
                    ...status,
                    isUserLoaded: true,
                })
                setUserDialog(false);
            } else {
                alert("Not enough info");
            }
        }
    };

    return (
        <Modal isOpen={showUserDialog}>
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
                            defaultValue={user.userName}
                            onKeyUp={() => nameValidCheck()}
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

export default DialogUserEdit;
