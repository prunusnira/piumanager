import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, ButtonGroup, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import TxtHeader from "./txtHeader";

interface Props {
    lang: string,
    mode: number,
    setPageMode: (mode: number) => void,
}

const Header = (props: Props) => {
    const [modeAlert, setModeAlert] = useState(false);
    const [targetMode, setTargetMode] = useState(0);
    
    const changeModeAlert = (tgtMode: number) => {
        // 같은 모드에서는 동작하지 않고 다른 모드일 때 경고 메시지를 띄움
        if(props.mode !== tgtMode) {
            setTargetMode(tgtMode);
            setModeAlert(true);
        }
    }

    const executeChange = () => {
        props.setPageMode(targetMode);
        closeDialog();
    }

    const closeDialog = () => {
        setModeAlert(false);
    }

    return (
        <>
            <CardHeader style={{
                backgroundColor: 'rgb(37, 37, 37) !important'
            }}>
                <Row>
                    <Col xs='12'>
                        <img
                            alt="logo"
                            src={process.env.PUBLIC_URL+"/logo192.png"}
                                style={{width: "40px", height: "40px"}} />
                        &nbsp;
                        <span style={{fontSize:"150%"}}>Pump It Up</span>
                        &nbsp;
                        <span>{(TxtHeader.subtitle as any)[props.lang]}</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12'>
                        <ButtonGroup style={{width: '100%'}}>
                            <Button onClick={() => changeModeAlert(0)}>
                                {(TxtHeader.btnMode as any)[props.lang]}
                            </Button>
                            <Button onClick={() => changeModeAlert(1)}>
                                {(TxtHeader.btnSearch as any)[props.lang]}
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </CardHeader>

            <Modal isOpen={modeAlert}>
                <ModalHeader>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    &nbsp;
                    {(TxtHeader as any).modeChange.title[props.lang]}
                </ModalHeader>
                <ModalBody>
                    {(TxtHeader as any).modeChange.body[props.lang]}
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button
                        onClick={executeChange}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default Header;