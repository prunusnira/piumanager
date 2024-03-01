import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ShareDlgType } from "../data/shareDlgType";
import { observer } from "mobx-react";
import TxtShareDlgKo from "../text/table/shareDlg/txtShareDlg-ko";
import TxtShareDlgJp from "../text/table/shareDlg/txtShareDlg-jp";
import TxtShareDlgCn from "../text/table/shareDlg/txtShareDlg-cn";
import TxtShareDlgEn from "../text/table/shareDlg/txtShareDlg-en";
import { Button } from "../styled/common.style";
import {useRecoilState, useRecoilValue} from "recoil";
import {atomLanguage} from "../recoil/language";
import {atomShareDialog, atomStatus} from "../recoil/status";

const DialogShare = observer(() => {
    const language = useRecoilValue(atomLanguage);
    const status = useRecoilValue(atomStatus);
    const [showShareDialog, setShowShareDialog] = useRecoilState(atomShareDialog);

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
});

export default DialogShare;
