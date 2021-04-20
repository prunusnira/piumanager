import React, {useState} from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col
} from 'reactstrap';
import TxtPatternDlg from './txtPatternDlg';

interface Props {
    lang: string,

    display: boolean,
    title: string,
    type: boolean,

    currentUpdateTitle: string,
    sdType: string,
    level: number
    ptid: Array<number>,

    updateData: (ptid: number, rank: string) => void,
    updatePatternDialog: (ptid: number, title: string) => void,
    updateMultipleData: (rank: string) => void,
    closeUpdatePatternDlg: () => void,
}

const PatternUpdateDialog = (props: Props) => {
    const [rank, setRank] = useState('0');
    
    const changeRank = (e: React.FormEvent<HTMLSelectElement>) => {
        setRank(e.currentTarget.value);
    }

    if(!props.display) {
        return null;
    }
    else {
        return (
            <Modal isOpen={props.display}>
                <ModalHeader>
                    {props.title}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="12">
                            {props.currentUpdateTitle}
                            <br/>
                            {props.sdType}&nbsp;{props.level}
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs="12" className="form-group">
                            <label htmlFor='grade'>Select rank:</label>
                            <select className='form-control'
                                    id='grade'
                                    onChange={changeRank}
                                    value={rank}>
                                <option value='0'>SSS</option>
                                <option value='1'>SS</option>
                                <option value='2'>S</option>
                                <option value='3'>A (Break On)</option>
                                <option value='4'>A (Break Off)</option>
                                <option value='8'>BCD (Break On)</option>
                                <option value='5'>BCD (Break Off)</option>
                                <option value='6'>F or GameOver</option>
                                <option value='7'>No Play</option>
                            </select>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" outlined="true" onClick={() => props.closeUpdatePatternDlg()}>
                        Close
                    </Button>
                    <Button color="secondary" outlined="true" onClick={() => {
                        if(!props.type) {
                            props.updateData(props.ptid[0], rank);
                        }
                        else {
                            props.updateMultipleData(rank);
                        }
                        }}>
                        {(TxtPatternDlg.update as any)[props.lang]}
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default PatternUpdateDialog;