import React, {Component} from 'react';

import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';

class PatternUpdateDialog extends Component {
    constructor(props) {
        super(props);
        this.nameinput = React.createRef();
        this.lvinput = React.createRef();
    }

    updateData(ptid) {

    }

    closeDialog() {

    }

    render() {
        const prop = this.props;
        const self = this;
        if(!prop.display) {
            return null;
        }
        else {
            return (
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                Title: {title}
                            </CardHeader>
                            <CardBody>
                                <div class='form-group'>
                                    <label htmlFor='grade'>Select rank:</label>
                                    <select class='form-control' id='grade'>
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
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col xs="12">
                                        <Button onClick={() => self.updateData(ptid)}>
                                            {txtPIU.update[lang]}
                                        </Button>
                                        <Button onClick={() => self.closeDialog()}>
                                            {txtPIU.cancel[lang]}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            )
        }
    }
}

export default PatternUpdateDialog;