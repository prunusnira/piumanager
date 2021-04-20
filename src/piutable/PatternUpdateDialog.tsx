import React, {Component} from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col
} from 'reactstrap';
import Language from './language';
import txtPIU from './txtpiu';

interface Props {
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
}

interface State {
    rank: string
}

class PatternUpdateDialog extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.changeRank = this.changeRank.bind(this);
    }
    private langObj: Language = new Language();
    private lang: string = this.langObj.getLang();

    state:State = {
        rank: "0"
    }

    changeRank(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({
            rank: e.currentTarget.value
        })
    }

    render() {
        const prop = this.props;
        const self = this;
        if(!prop.display) {
            return null;
        }
        else {
            return (
                <Modal isOpen={prop.display}>
                    <ModalHeader>
                        {prop.title}
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="12">
                                {prop.currentUpdateTitle}
                                <br/>
                                {prop.sdType}&nbsp;{prop.level}
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col xs="12" className="form-group">
                                <label htmlFor='grade'>Select rank:</label>
                                <select className='form-control'
                                        id='grade'
                                        onChange={self.changeRank}
                                        value={self.state.rank}>
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
                        <Button color="secondary" outlined="true" onClick={() => prop.updatePatternDialog(0, "")}>
                            Close
                        </Button>
                        <Button color="secondary" outlined="true" onClick={() => {
                            if(!prop.type) {
                                prop.updateData(prop.ptid[0], self.state.rank);
                            }
                            else {
                                prop.updateMultipleData(self.state.rank);
                            }
                            }}>
                            {(txtPIU.update as any)[self.lang]}
                        </Button>
                    </ModalFooter>
                </Modal>
            )
        }
    }
}

export default PatternUpdateDialog;