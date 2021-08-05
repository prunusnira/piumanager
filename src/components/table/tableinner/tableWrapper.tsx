import React from 'react'
import { faImages, faShareAltSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import {unixTimeToText} from '../tool'
import PIUTableObj from '../tableobj/piuTableObj'
import IntegratedStore from '../../../mobx/integratedStore'
import { observer } from 'mobx-react'
import { PatternType } from '../data/patternType'

interface TableProps {
    scrShot: (div: string, file: string) => void,
    shareURL: () => void,
}

const TableWrapper = observer((props: TableProps) => {
    const {status, user, table} = IntegratedStore

    return (
        <Row
            style={{display: status.status.isUserLoaded ? "block" : "none"}}
            id="targetTable">
            <Col xs="12">
                <Card>
                    <CardHeader style={{
                        backgroundColor: 'rgb(37, 37, 37)',
                        height: '50px'
                    }}>
                        <Row>
                            <Col xs="8">
                                <h4>Pump It Up</h4>
                            </Col>
                            <Col xs="4" className="text-right nowrap">
                                <Button
                                    color="secondary"
                                    onClick={() => {
                                        props.scrShot('targetTable', `piu_${user.user.userName}_${status.status.patternType}_${status.status.patternLv}_${unixTimeToText(new Date().getTime())}.jpg`)
                                    }}>
                                    <FontAwesomeIcon icon={faImages}/>
                                </Button>
                                <Button color="secondary" onClick={() => props.shareURL()}>
                                    <FontAwesomeIcon icon={faShareAltSquare}/>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <h5>
                                    {status.status.patternType === PatternType.SINGLE ? 'Single' :
                                        status.status.patternType === PatternType.DOUBLE ? 'Double' :
                                        'CO-OP'}
                                    &nbsp;
                                    Lv.{status.status.patternLv} Clear Table
                                </h5>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="4"
                                style={{backgroundColor:""}}>
                                <b>
                                    <span style={{fontSize: "80%"}}>PLAYER NAME</span>
                                </b>
                                &nbsp;
                                <span data-testid='txtPlayerName'>{user.user.userName}</span><br/>
                                <b>
                                    <span style={{fontSize: "80%"}}>PLAYER LEVEL</span>
                                </b>
                                &nbsp;
                                <span>{user.user.userLv}</span>
                            </Col>
                            <Col xs="8" style={{fontSize: "80%"}} className="text-center">
                                <Row>
                                    <Col xs='12' className='text-center'>
                                        {`SSS: ${status.status.rankcount.sss} | SS: ${status.status.rankcount.ss} | S: ${status.status.rankcount.s} | A: ${status.status.rankcount.aon} | BCD: ${status.status.rankcount.bcdon}`}
                                    </Col>
                                    <Col xs='12' className='text-center'>
                                        {`A: ${status.status.rankcount.aoff} (Off) | BCD: ${status.status.rankcount.bcdoff} (Off) | F: ${status.status.rankcount.f} | No Play: ${status.status.rankcount.np}`}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="div-lineadd" id="divOver"
                            style={{backgroundColor: "#ffadc5"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catOver">
                                        {table.table.over.title}
                                    </Col>
                                </Row>
                                <Row id="lvOver">
                                    <PIUTableObj
                                        list={table.table.over.data}
                                        keyv="ov"
                                        showrank={status.status.showTableRank}
                                        showcheck={status.status.showTableCheck} />
                                </Row>
                            </Col>
                        </Row>
                    
                        <Row className="div-lineadd" id="divHigh"
                            style={{backgroundColor: "#ffa9b0"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catHigh">
                                        {table.table.high.title}
                                    </Col>
                                </Row>
                                <Row id="lvHigh">
                                    <PIUTableObj
                                        list={table.table.high.data}
                                        keyv="hi"
                                        showrank={status.status.showTableRank}
                                        showcheck={status.status.showTableCheck} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row className="div-lineadd" id="divNH"
                            style={{backgroundColor: "#ffdda6"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catNH">
                                        {table.table.normalhigh.title}
                                    </Col>
                                </Row>
                                <Row id="lvNH">
                                    <PIUTableObj
                                        list={table.table.normalhigh.data}
                                        keyv="nh"
                                        showrank={status.status.showTableRank}
                                        showcheck={status.status.showTableCheck} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row className="div-lineadd" id="divNormal"
                            style={{backgroundColor: "#f8e5d0"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catNormal">
                                        {table.table.normal.title}
                                    </Col>
                                </Row>
                                <Row id="lvNormal">
                                    <PIUTableObj
                                        list={table.table.normal.data}
                                        keyv="nr"
                                        showrank={status.status.showTableRank}
                                        showcheck={status.status.showTableCheck} />
                                </Row>
                            </Col>
                        </Row>
                            
                        <Row className="div-lineadd" id="divNE"
                            style={{backgroundColor: "#a9e2c5"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catNE">
                                        {table.table.normaleasy.title}
                                    </Col>
                                </Row>
                                <Row id="lvNE">
                                    <PIUTableObj
                                        list={table.table.normaleasy.data}
                                        keyv="ne"
                                        showrank={status.status.showTableRank}
                                        showcheck={status.status.showTableCheck} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row className="div-lineadd" id="divEasy"
                            style={{backgroundColor: "#bbd1e8"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catEasy">
                                        {table.table.easy.title}
                                    </Col>
                                </Row>
                                <Row id="lvEasy">
                                    <PIUTableObj
                                        list={table.table.easy.data}
                                        keyv="ez"
                                        showrank={status.status.showTableRank}
                                        showcheck={status.status.showTableCheck} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row className="div-lineadd" id="divBelow"
                            style={{backgroundColor: "#c6d6f7"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catBelow">
                                        {table.table.below.title}
                                    </Col>
                                </Row>
                                <Row id="lvBelow">
                                    <PIUTableObj
                                        list={table.table.below.data}
                                        keyv="be"
                                        showrank={status.status.showTableRank}
                                        showcheck={status.status.showTableCheck} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row id="divRandom"
                            style={{backgroundColor: "#ab95d4"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catRandom">
                                        {table.table.random.title}
                                    </Col>
                                </Row>
                                <Row id="lvRandom">
                                    <PIUTableObj
                                        list={table.table.random.data}
                                        keyv="rd"
                                        showrank={status.status.showTableRank}
                                        showcheck={status.status.showTableCheck} />
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
})

export default TableWrapper