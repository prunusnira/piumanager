import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Store from "../mobx/store";
import { ShareDlgType } from "../data/shareDlgType";
import { observer } from "mobx-react";

import TxtShareDlgKo from "../text/table/shareDlg/txtShareDlg-ko";
import TxtShareDlgJp from "../text/table/shareDlg/txtShareDlg-jp";
import TxtShareDlgCn from "../text/table/shareDlg/txtShareDlg-cn";
import TxtShareDlgEn from "../text/table/shareDlg/txtShareDlg-en";
import { Button } from "../styled/common.style";

const DialogShare = observer(() => {
    const { status, language } = Store;

    const TxtShareDlg =
        language.language === "ko"
            ? TxtShareDlgKo
            : language.language === "jp"
            ? TxtShareDlgJp
            : language.language === "cn"
            ? TxtShareDlgCn
            : TxtShareDlgEn;

    let cont1;
    let cont2;
    if (status.status.shareDlgType === ShareDlgType.SUCCESS) {
        cont1 = TxtShareDlg.sharedlg.cont;
        cont2 = `https://piu.nira.one/saved/${status.status.shareCode}`;
    } else {
        cont1 = TxtShareDlg.sharedlg.error;
        cont2 = "";
    }

    return (
        <Modal isOpen={status.status.showShareDlg}>
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
                        status.status.showShareDlg = false;
                    }}
                >
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
});

export default DialogShare;
