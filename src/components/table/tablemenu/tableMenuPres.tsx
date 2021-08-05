import React from "react"
import { Button, Col, Row } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { PatternType } from "../data/patternType"
import IntegratedStore from "../../../mobx/integratedStore"
import { UserDlgType } from "../data/userDlgType"
import { observer } from 'mobx-react'
import { PatternDlgType } from "../data/patternDlgType"

import TxtTableMenuKo from '../../../text/table/tablemenu/txtTablemenu-ko'
import TxtTableMenuJp from '../../../text/table/tablemenu/txtTablemenu-jp'
import TxtTableMenuCn from '../../../text/table/tablemenu/txtTablemenu-cn'
import TxtTableMenuEn from '../../../text/table/tablemenu/txtTablemenu-en'

const TableMenuPres = observer(() => {
    const {language, status} = IntegratedStore

    const TxtTableMenu =
        language.language === 'ko' ? TxtTableMenuKo :
        language.language === 'jp' ? TxtTableMenuJp :
        language.language === 'cn' ? TxtTableMenuCn : TxtTableMenuEn

    return (
        <Row style={{display: status.status.isUserLoaded ? "block" : "none"}}>
            <Col xs="12">
                <Row>
                    <Col xs='12'
                        id="seldiffSingletitle"
                        style={{
                            color: 'white',
                            backgroundColor: 'rgb(37, 37, 37)',
                            height: '50px',
                            padding: '10px'
                        }}>
                            <h4>{TxtTableMenu.menu}</h4>
                    </Col>
                </Row>

                <Row id="seldiffSingle">
                    <Col xs="12" md="6">
                        <Row>
                            <Col xs="12" className="text-center">
                                {TxtTableMenu.patternsel}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="4" className="text-center">
                                SINGLE<br/>
                                <select className="form-control"
                                    onChange={(e) => {
                                        status.status.patternType = PatternType.SINGLE
                                        status.status.patternLv = parseInt(e.currentTarget.value)
                                    }}>
                                    <option value="12">SELECT</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24+</option>
                                </select>
                            </Col>
                            <Col xs="4" className="text-center">
                                DOUBLE<br/>
                                <select className="form-control"
                                    onChange={(e) => {
                                        status.status.patternType = PatternType.DOUBLE
                                        status.status.patternLv = parseInt(e.currentTarget.value)
                                    }}>
                                    <option value="12">SELECT</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25+</option>
                                </select>
                            </Col>
                            <Col xs="4" className="text-center">
                                CO-OP<br/>
                                <select className="form-control"
                                    onChange={(e) => {
                                        status.status.patternType = PatternType.COOP
                                        status.status.patternLv = parseInt(e.currentTarget.value)
                                    }}>
                                    <option value="0">SELECT</option>
                                    <option value="2">x2</option>
                                    <option value="3">x3</option>
                                    <option value="4">x4</option>
                                    <option value="5">x5+</option>
                                </select>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs="12" md="6">
                        <Row>
                            <Col xs="12" className="text-center">
                                {TxtTableMenu.menu}
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col xs="12" className="text-center btn-group">
                                <Button color="secondary" style={{width:"50%"}} onClick={() => {
                                    status.status.showUserDialog = true
                                    status.status.userDlgType = UserDlgType.EDITUSER
                                }}>
                                    {TxtTableMenu.edit}
                                </Button>
                                <Button color="secondary" style={{width:"50%"}} onClick={() => {
                                    status.status.showPtUpdDlg = true
                                    status.status.patternUpdDlgType = PatternDlgType.MULTIPLE
                                }}>
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                    {TxtTableMenu.updatecheckedbtn}
                                </Button>
                            </Col>
                            <Col xs="12" className="text-center btn-group">
                                <Button color="secondary" style={{width:"50%"}} onClick={() => {
                                    status.status.showTableCheck = !status.status.showTableCheck
                                }}>
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                    {TxtTableMenu.display}
                                </Button>
                                <Button color="secondary" style={{width:"50%"}} onClick={() => {
                                    status.status.showTableRank = !status.status.showTableRank
                                }}>
                                    {TxtTableMenu.rank}
                                    &nbsp;
                                    {TxtTableMenu.display}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="12">
                        <Row>
                            <Col xs="12" className="text-center">
                                {TxtTableMenu.songtype}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="3" className="text-center">
                                <input id="musarcade" type="checkbox" value="musarcade"
                                    onChange={() => {
                                        status.status.showArcade = !status.status.showArcade
                                    }}
                                    checked={status.status.showArcade} />
                                <label htmlFor="musarcade">Arcade</label>
                            </Col>
                            <Col xs="3" className="text-center">
                                <input id="musshort" type="checkbox" value="musshort"
                                    onChange={() => {
                                        status.status.showShort = !status.status.showShort
                                    }}
                                    checked={status.status.showShort} />
                                <label htmlFor="musshort">Shortcut</label>
                            </Col>
                            <Col xs="3" className="text-center">
                                <input id="musfull" type="checkbox" value="musfull"
                                    onChange={() => {
                                        status.status.showFull = !status.status.showFull
                                    }}
                                    checked={status.status.showFull} />
                                <label htmlFor="musfull">Fullsong</label>
                            </Col>
                            <Col xs="3" className="text-center">
                                <input id="musremix" type="checkbox" value="musremix"
                                    onChange={() => {
                                        status.status.showRemix = !status.status.showRemix
                                    }}
                                    checked={status.status.showRemix} />
                                <label htmlFor="musremix">Remix</label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
})

export default TableMenuPres