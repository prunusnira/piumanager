import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Store from "../mobx/store";
import { observer } from "mobx-react";

import TxtSaveBeforeLoadKo from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-ko";
import TxtSaveBeforeLoadJp from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-jp";
import TxtSaveBeforeLoadCn from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-cn";
import TxtSaveBeforeLoadEn from "../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-en";
import { Button } from "../styled/common.style";

const DialogSaveAlert = observer(() => {
    const { status, language } = Store;

    const TxtSaveBeforeLoad =
        language.language === "ko"
            ? TxtSaveBeforeLoadKo
            : language.language === "jp"
            ? TxtSaveBeforeLoadJp
            : language.language === "cn"
            ? TxtSaveBeforeLoadCn
            : TxtSaveBeforeLoadEn;

    return (
        <Modal isOpen={status.status.showSaveBeforeLoadDialog}>
            <ModalHeader>{TxtSaveBeforeLoad.title}</ModalHeader>
            <ModalBody>{TxtSaveBeforeLoad.body.p1}</ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        status.status.showSaveBeforeLoadDialog = false;
                    }}
                >
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    );
});

export default DialogSaveAlert;
