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

interface Props {
    curname: string,
    curlv: string,
    handler: (name: string, lv: string) => void,
    toggle: () => void,
    display: boolean,
    title: string,
    button: string
}

class UserDialog extends Component<Props> {
    private nameinput = React.createRef<HTMLInputElement>();
    private lvinput = React.createRef<HTMLInputElement>();
    private curname = this.props.curname;
    private curlv = this.props.curlv;

    nameValidCheck() {
        const regex = /^[a-zA-Z0-9]+$/;
        const name = this.nameinput.current;
        if (name && regex.test(name.value) !== true)
            name.value = name.value.replace(/[^a-zA-Z0-9]+/, '');
    }

    addNewUser() {
        // 새 유저 UI에서 이름과 레벨 정보를 입력
        // username과 userlv를 업데이트하고 난이도 선택 버튼 표시
        const name = this.nameinput.current;
        const lv = this.lvinput.current;
        
        if(name && lv) {
            if(name.value !== "" && lv.value !== "") {
                this.props.handler(name.value, lv.value);
            }
            else {
                alert("Not enough info");
                //alert(txtPIU.newuserempty[lang]);
            }
            
            this.props.toggle();
        }
    }

    closeDialog() {
        this.props.toggle();
    }

    componentWillReceiveProps(props:Props) {
        this.curname = props.curname;
        this.curlv = props.curlv;
    }

    render() {
        const prop = this.props;
        const self = this;

        return (
            <Modal isOpen={prop.display}>
                <ModalHeader>{prop.title}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="4">
                            User Name
                        </Col>
                        <Col xs="8">
                            <input ref={this.nameinput} className='form-control'
                                type='text' id='newname' placeholder='NAME'
                                defaultValue={self.curname}
                                onKeyUp={() => self.nameValidCheck()} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">
                            User Level
                        </Col>
                        <Col xs="8">
                            <input ref={this.lvinput} className='form-control'
                                type='number' min='1' step='1' id='newlv'
                                defaultValue={self.curlv}
                                onKeyPress={(event) => (event.charCode >= 48 && event.charCode <= 57)}
                                placeholder='LEVEL'/>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => self.closeDialog()}>
                        Close
                    </Button>
                    <Button onClick={() => self.addNewUser()}>
                        {prop.button}
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default UserDialog;