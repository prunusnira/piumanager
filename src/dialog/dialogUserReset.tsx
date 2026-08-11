import React from "react";
import {Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import TxtResetModalKo from "../text/table/resetDlg/txtResetModal-ko";
import TxtResetModalJp from "../text/table/resetDlg/txtResetModal-jp";
import TxtResetModalCn from "../text/table/resetDlg/txtResetModal-cn";
import TxtResetModalEn from "../text/table/resetDlg/txtResetModal-en";
import {Button} from "../styled/common.style";
import {useAtom, useAtomValue} from "jotai";
import {atomLanguage} from "../atoms/language";
import {atomUserResetDialog} from "../atoms/status";

interface Props {
    runUserReset: () => void;
}

const DialogUserReset = (props: Props) => {
    const language = useAtomValue(atomLanguage);
    const [showUserResetDialog, setUserResetDialog] = useAtom(atomUserResetDialog);

    const TxtResetModal =
        language === "ko"
            ? TxtResetModalKo
            : language === "jp"
                ? TxtResetModalJp
                : language === "cn"
                    ? TxtResetModalCn
                    : TxtResetModalEn;

    return (
        <Modal isOpen={showUserResetDialog}>
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
                <Button onClick={() => {
                    setUserResetDialog(false);
                }}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default DialogUserReset;
