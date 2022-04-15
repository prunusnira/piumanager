import React from "react";
import { Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import IntegratedStore from "../../../mobx/integratedStore";
import { observer } from "mobx-react";

import TxtResetModalKo from "../../../text/table/resetDlg/txtResetModal-ko";
import TxtResetModalJp from "../../../text/table/resetDlg/txtResetModal-jp";
import TxtResetModalCn from "../../../text/table/resetDlg/txtResetModal-cn";
import TxtResetModalEn from "../../../text/table/resetDlg/txtResetModal-en";
import { Button } from "../../../styled/common.style";

interface Props {
    closeUserResetDlg: () => void;
    runUserReset: () => void;
}

const UserResetModal = observer((props: Props) => {
    const { status, language } = IntegratedStore;

    const TxtResetModal =
        language.language === "ko"
            ? TxtResetModalKo
            : language.language === "jp"
            ? TxtResetModalJp
            : language.language === "cn"
            ? TxtResetModalCn
            : TxtResetModalEn;

    return (
        <Modal isOpen={status.status.showUserResetDialog}>
            <ModalHeader>{TxtResetModal.title}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="12">{TxtResetModal.body.p1}</Col>
                </Row>
                <Row>
                    <Col xs="12">{TxtResetModal.body.p2}</Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.runUserReset}>OK</Button>
                <Button onClick={props.closeUserResetDlg}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
});

export default UserResetModal;
