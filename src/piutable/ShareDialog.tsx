import React, {Component} from 'react';
import txtPIU from './txtpiu';
import Language from './language';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

interface Props {
    display: boolean,
    content1: string,
    content2: string,
    close: () => void
}

class ShareDialog extends Component<Props> {
    private langObj: Language = new Language();
    private lang: string = this.langObj.getLang();

    render() {
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    {(txtPIU.sharedlg.title as any)[this.lang]}
                </ModalHeader>
                <ModalBody>
                    {this.props.content1}<br/><br/>
                    <b>{this.props.content2}</b>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.close}>OK</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ShareDialog;