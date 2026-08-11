import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ShareDlgType } from "../data/shareDlgType";
import TxtShareDlgKo from "../text/table/shareDlg/txtShareDlg-ko";
import TxtShareDlgJp from "../text/table/shareDlg/txtShareDlg-jp";
import TxtShareDlgCn from "../text/table/shareDlg/txtShareDlg-cn";
import TxtShareDlgEn from "../text/table/shareDlg/txtShareDlg-en";
import { Button } from "../styled/common.style";
import {useAtom, useAtomValue} from "jotai";
import {atomLanguage} from "../atoms/language";
import {atomShareDialog, atomStatus} from "../atoms/status";

const DialogShare = () => {
    const language = useAtomValue(atomLanguage);
    const status = useAtomValue(atomStatus);
    const [showShareDialog, setShowShareDialog] = useAtom(atomShareDialog);

    const TxtShareDlg =
        language === "ko"
            ? TxtShareDlgKo
            : language === "jp"
            ? TxtShareDlgJp
            : language === "cn"
            ? TxtShareDlgCn
            : TxtShareDlgEn;

    let cont1;
    let cont2;
    if (status.shareDlgType === ShareDlgType.SUCCESS) {
        cont1 = TxtShareDlg.sharedlg.cont;
        cont2 = `https://piu.nira.one/saved/${status.shareCode}`;
    } else {
        cont1 = TxtShareDlg.sharedlg.error;
        cont2 = "";
    }

    return (
        <Modal isOpen={showShareDialog}>
            <ModalHeader>{TxtShareDlg.sharedlg.title}</ModalHeader>
            <ModalBody>
                {cont1}
                <br />
                <br />
                <b>{cont2}</b>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        setShowShareDialog(false)
                    }}
                >
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DialogShare;
