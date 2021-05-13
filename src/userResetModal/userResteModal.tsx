import React from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import TxtResetModal from './txtResetModal'

interface Props {
    lang: string,
    showUserResetDlg: boolean,
    closeUserResetDlg: () => void,
    runUserReset: () => void
}

const UserResetModal = (props: Props) => {
    return (
        <Modal isOpen={props.showUserResetDlg}>
            <ModalHeader>
                {(TxtResetModal.title as any)[props.lang]}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="12">
                        {(TxtResetModal.body.p1 as any)[props.lang]}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {(TxtResetModal.body.p2 as any)[props.lang]}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.closeUserResetDlg}>
                    Cancel
                </Button>
                <Button onClick={props.runUserReset}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default UserResetModal