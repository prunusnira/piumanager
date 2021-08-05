import React from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import IntegratedStore from '../../../mobx/integratedStore'
import { observer } from 'mobx-react'

import TxtResetModalKo from '../../../text/table/resetDlg/txtResetModal-ko'
import TxtResetModalJp from '../../../text/table/resetDlg/txtResetModal-jp'
import TxtResetModalCn from '../../../text/table/resetDlg/txtResetModal-cn'
import TxtResetModalEn from '../../../text/table/resetDlg/txtResetModal-en'

interface Props {
    closeUserResetDlg: () => void,
    runUserReset: () => void
}

const UserResetModal = observer((props: Props) => {
    const {status, language} = IntegratedStore

    const TxtResetModal =
        language.language === 'ko' ? TxtResetModalKo :
        language.language === 'jp' ? TxtResetModalJp :
        language.language === 'cn' ? TxtResetModalCn : TxtResetModalEn
    
    return (
        <Modal isOpen={status.status.showUserResetDialog}>
            <ModalHeader>
                {TxtResetModal.title}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="12">
                        {TxtResetModal.body.p1}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {TxtResetModal.body.p2}
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
})

export default UserResetModal