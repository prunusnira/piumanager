import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import TxtSaveBeforeLoad from './txtSaveBeforeLoad'

interface Props {
    lang: string,
    showSaveBeforeLoadDlg: boolean,
    closeSaveBeforeLoadDlg: () => void
}

const SaveBeforeLoadDlg = (props: Props) => {
    return (
        <Modal isOpen={props.showSaveBeforeLoadDlg}>            
            <ModalHeader>
                {(TxtSaveBeforeLoad.title as any)[props.lang]}
            </ModalHeader>
            <ModalBody>
                {(TxtSaveBeforeLoad.body.p1 as any)[props.lang]}
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.closeSaveBeforeLoadDlg}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default SaveBeforeLoadDlg