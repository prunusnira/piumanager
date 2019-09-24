import React, {Component} from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

let dlg = null;

class PatternUpdateDialog extends Component {
    constructor(props) {
        super(props);
        this.nameinput = React.createRef();
        this.lvinput = React.createRef();
        dlg = this;

        this.state = {
            rank: 0
        }
    }

    changeRank(e) {
        dlg.setState({
            rank: e.target.value
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
                        <div className='form-group'>
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
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => prop.updatePatternDialog()}>
                            Close
                        </Button>
                        <Button onClick={() => prop.updateData(prop.ptid, self.state.rank)}>
                            {prop.button}
                        </Button>
                    </ModalFooter>
                </Modal>
            )
        }
    }
}

export default PatternUpdateDialog;