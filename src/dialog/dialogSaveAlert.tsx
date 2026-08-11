import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import TxtSaveBeforeLoadKo from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-ko";
import TxtSaveBeforeLoadJp from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-jp";
import TxtSaveBeforeLoadCn from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-cn";
import TxtSaveBeforeLoadEn from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-en";
import { Button } from "../styled/common.style";
import {useAtom, useAtomValue} from "jotai";
import {atomLanguage} from "../atoms/language";
import {atomSaveAlertDialog} from "../atoms/status";

const DialogSaveAlert = () => {
    const language = useAtomValue(atomLanguage);
    const [showSaveAlertDialog, setSaveAlertDialog] = useAtom(atomSaveAlertDialog);

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
};

export default DialogSaveAlert;
