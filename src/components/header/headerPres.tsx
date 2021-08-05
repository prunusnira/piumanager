import React from "react"
import { Button, ButtonGroup, CardHeader, Col, Row } from "reactstrap"
import IntegratedStore from "../../mobx/integratedStore"
import {observer} from 'mobx-react'

import TxtHeaderKo from "../../text/header/txtHeader-ko"
import TxtHeaderJp from "../../text/header/txtHeader-jp"
import TxtHeaderEn from "../../text/header/txtHeader-en"
import TxtHeaderCn from "../../text/header/txtHeader-cn"

type HeaderProps = {
    changeModeAlert: (t: number) => void
}

const HeaderPres = observer((props: HeaderProps) => {
    const {language} = IntegratedStore
    
    const TxtHeader =
        language.language === 'ko' ? TxtHeaderKo :
        language.language === 'jp' ? TxtHeaderJp :
        language.language === 'cn' ? TxtHeaderCn : TxtHeaderEn

    return (
        <CardHeader style={{
            backgroundColor: 'rgb(37, 37, 37) !important'
        }}>
            <Row>
                <Col xs='12'>
                    <img
                        alt="logo"
                        src={`${process.env.PUBLIC_URL}/logo192.png`}
                            style={{width: "40px", height: "40px"}} />
                    &nbsp;
                    <span style={{fontSize:"150%"}}>Pump It Up</span>
                    &nbsp;
                    <span>{TxtHeader.subtitle}</span>
                </Col>
            </Row>
            <Row>
                <Col xs='12'>
                    <ButtonGroup style={{width: '100%'}}>
                        <Button onClick={() => props.changeModeAlert(0)}>
                            {TxtHeader.btnMode}
                        </Button>
                        <Button onClick={() => props.changeModeAlert(1)}>
                            {TxtHeader.btnSearch}
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </CardHeader>
    )
})

export default HeaderPres