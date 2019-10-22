import React, {Component} from 'react';
import txtPIU from './txtpiu';
import Lang from './language';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

class ShareDialog extends Component {
    lang = Lang.getLang();

    render() {
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    {txtPIU.sharedlg.title[this.lang]}
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