import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { observer } from "mobx-react";
import TxtSaveBeforeLoadKo from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-ko";
import TxtSaveBeforeLoadJp from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-jp";
import TxtSaveBeforeLoadCn from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-cn";
import TxtSaveBeforeLoadEn from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-en";
import { Button } from "../styled/common.style";
import {useRecoilState, useRecoilValue} from "recoil";
import {atomLanguage} from "../recoil/language";
import {atomSaveAlertDialog} from "../recoil/status";

const DialogSaveAlert = observer(() => {
    const language = useRecoilValue(atomLanguage);
    const [showSaveAlertDialog, setSaveAlertDialog] = useRecoilState(atomSaveAlertDialog);

    const TxtSaveBeforeLoad =
        language === "ko"
            ? TxtSaveBeforeLoadKo
            : language === "jp"
            ? TxtSaveBeforeLoadJp
            : language === "cn"
            ? TxtSaveBeforeLoadCn
            : TxtSaveBeforeLoadEn;

    return (
        <Modal isOpen={showSaveAlertDialog}>
            <ModalHeader>{TxtSaveBeforeLoad.title}</ModalHeader>
            <ModalBody>{TxtSaveBeforeLoad.body.p1}</ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        setSaveAlertDialog(false)
                    }}
                >
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
});

export default DialogSaveAlert;
