import React, {Component} from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import TxtShareDlg from './txtShareDlg';

interface Props {
    lang: string,
    display: boolean,
    content1: string,
    content2: string,
    close: () => void
}

const ShareDialog = (props: Props) => {
    return (
        <Modal isOpen={props.display}>
            <ModalHeader>
                {(TxtShareDlg.sharedlg.title as any)[props.lang]}
            </ModalHeader>
            <ModalBody>
                {props.content1}<br/><br/>
                <b>{props.content2}</b>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" outlined="true" onClick={props.close}>OK</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ShareDialog;