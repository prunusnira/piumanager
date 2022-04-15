import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import IntegratedStore from "../../../mobx/integratedStore";
import { observer } from "mobx-react";

import TxtSaveBeforeLoadKo from "../../../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-ko";
import TxtSaveBeforeLoadJp from "../../../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-jp";
import TxtSaveBeforeLoadCn from "../../../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-cn";
import TxtSaveBeforeLoadEn from "../../../text/table/saveBeforeLoadDlg/txtSaveBeforeLoad-en";
import { Button } from "../../../styled/common.style";

const SaveBeforeLoadDlg = observer(() => {
    const { status, language } = IntegratedStore;

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

export default SaveBeforeLoadDlg;
