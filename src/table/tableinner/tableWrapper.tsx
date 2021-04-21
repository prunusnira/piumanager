import React from 'react';
import { faImages, faShareAltSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import CryptoJS from 'crypto-js';
import { MusicData } from '../data/musicdataType';
import {unixTimeToText} from '../tool';
import TxtTable from './txtTable';
import PIUTableObj from '../tableobj/piuTableObj';
import CommonData from '../data/commonData';

interface TableProps {
    lang: string,

    isLoaded: boolean,
    sdType: string,
    level: number,

    userName: string,
    userLv: number,
    userStatus: Map<number, string>,

    txtOver: string,
    txtHigh: string,
    txtNh: string,
    txtNormal: string,
    txtNe: string,
    txtEasy: string,
    txtBelow: string,
    txtRandom: string,

    arrOver: Array<MusicData>,
    arrHigh: Array<MusicData>,
    arrNh: Array<MusicData>,
    arrNormal: Array<MusicData>,
    arrNe: Array<MusicData>,
    arrEasy: Array<MusicData>,
    arrBelow: Array<MusicData>,
    arrRandom: Array<MusicData>,

    setShowShareDlg: (b: boolean) => void,
    setShareDlgCont1: (cont: string) => void,
    setShareDlgCont2: (cont: string) => void,

    rankCountTxt1: string,
    rankCountTxt2: string,

    showTableRank: boolean,
    showTableCheck: boolean,

    openUpdatePatternDlg: (ptid: number, title: string) => void,
}

const TableWrapper = (props: TableProps) => {
    const chback = {
        backgroundColor: 'rgb(37, 37, 37)',
        height: '50px'
    }

    const scrShot = (divname: string, filename: string) => {
        window.scrollTo(0, 0);
        const div = document.getElementById(divname);

        if(div) {
            html2canvas(div, {
                useCORS: true,
                allowTaint: false,
                backgroundColor: "#000000",
                scale: 1
            })
            .then(function(canvas) {
                const el = document.createElement("a");
                el.href = canvas.toDataURL("image/jpeg");
                el.download = filename;
                el.click();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
    }

    const shareURL = () => {
        let text = props.userName+"," + props.userLv + "\n";
        
        const keys = props.userStatus.keys();
        for(let i = 0; i < props.userStatus.size; i++) {
            const ckey = keys.next();
            if(ckey.value !== "")
                text += ckey.value + "," + props.userStatus.get(ckey.value) + "\n";
        }

        const datafixed = btoa(text);
        
        // 랜덤코드 발행
        const code = CryptoJS.SHA1(props.userName+new Date().toTimeString()).toString();

        axios.post(`${CommonData.dataUrl}share/${code}/0`,
            {
                "data": datafixed
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                let message1 = '';
                let message2 = '';
                if(res.status === 200) {
                    message1 = (TxtTable.sharedlg.cont as any)[props.lang];
                    message2 = `https://piu.nira.one/saved/${code}`;
                }
                else {
                    message1 = (TxtTable.sharedlg.error as any)[props.lang];
                    message2 = ``;
                }

                props.setShowShareDlg(true);
                props.setShareDlgCont1(message1);
                props.setShareDlgCont2(message2);
            });
    }

    return (
        <Row
            style={{display: props.isLoaded ? "block" : "none"}}
            id="targetTable">
            <Col xs="12">
                <Card>
                    <CardHeader style={chback}>
                        <Row>
                            <Col xs="8">
                                <h4>Pump It Up XX</h4>
                            </Col>
                            <Col xs="4" className="text-right nowrap">
                                <Button color="secondary" outline onClick={() => scrShot('targetTable', `piu_${props.userName}_${props.sdType}_${props.level}_${unixTimeToText(new Date().getTime())}.jpg`)}>
                                    <FontAwesomeIcon icon={faImages}/>
                                </Button>
                                <Button color="secondary" outline onClick={() => shareURL()}>
                                    <FontAwesomeIcon icon={faShareAltSquare}/>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <h5>{props.sdType} Lv.{props.level} Clear Table</h5>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="4"
                                style={{backgroundColor:""}}>
                                <b><span style={{fontSize: "80%"}}>PLAYER NAME</span></b> {props.userName}<br/>
                                <b><span style={{fontSize: "80%"}}>PLAYER LEVEL</span></b> {props.userLv}
                            </Col>
                            <Col xs="8" style={{fontSize: "80%"}} className="text-center">
                                {props.rankCountTxt1}<br/>
                                {props.rankCountTxt2}
                            </Col>
                        </Row>
                        <Row className="div-lineadd" id="divOver"
                            style={{backgroundColor: "#ffadc5"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catOver">
                                        {props.txtOver}
                                    </Col>
                                </Row>
                                <Row id="lvOver">
                                    <PIUTableObj
                                        list={props.arrOver}
                                        key="ov"
                                        lang={props.lang}
                                        showrank={props.showTableRank}
                                        showcheck={props.showTableCheck}
                                        openUpdatePatternDlg={props.openUpdatePatternDlg} />
                                </Row>
                            </Col>
                        </Row>
                    
                        <Row className="div-lineadd" id="divHigh"
                            style={{backgroundColor: "#ffa9b0"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catHigh">
                                        {props.txtHigh}
                                    </Col>
                                </Row>
                                <Row id="lvHigh">
                                    <PIUTableObj
                                        list={props.arrHigh}
                                        key="hi"
                                        lang={props.lang}
                                        showrank={props.showTableRank}
                                        showcheck={props.showTableCheck}
                                        openUpdatePatternDlg={props.openUpdatePatternDlg} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row className="div-lineadd" id="divNH"
                            style={{backgroundColor: "#ffdda6"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catNH">
                                        {props.txtNh}
                                    </Col>
                                </Row>
                                <Row id="lvNH">
                                    <PIUTableObj
                                        list={props.arrNh}
                                        key="nh"
                                        lang={props.lang}
                                        showrank={props.showTableRank}
                                        showcheck={props.showTableCheck}
                                        openUpdatePatternDlg={props.openUpdatePatternDlg} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row className="div-lineadd" id="divNormal"
                            style={{backgroundColor: "#f8e5d0"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catNormal">
                                        {props.txtNormal}
                                    </Col>
                                </Row>
                                <Row id="lvNormal">
                                    <PIUTableObj
                                        list={props.arrNormal}
                                        key="nr"
                                        lang={props.lang}
                                        showrank={props.showTableRank}
                                        showcheck={props.showTableCheck}
                                        openUpdatePatternDlg={props.openUpdatePatternDlg} />
                                </Row>
                            </Col>
                        </Row>
                            
                        <Row className="div-lineadd" id="divNE"
                            style={{backgroundColor: "#a9e2c5"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catNE">
                                        {props.txtNe}
                                    </Col>
                                </Row>
                                <Row id="lvNE">
                                    <PIUTableObj
                                        list={props.arrNe}
                                        key="ne"
                                        lang={props.lang}
                                        showrank={props.showTableRank}
                                        showcheck={props.showTableCheck}
                                        openUpdatePatternDlg={props.openUpdatePatternDlg} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row className="div-lineadd" id="divEasy"
                            style={{backgroundColor: "#bbd1e8"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catEasy">
                                        {props.txtEasy}
                                    </Col>
                                </Row>
                                <Row id="lvEasy">
                                    <PIUTableObj
                                        list={props.arrEasy}
                                        key="ez"
                                        lang={props.lang}
                                        showrank={props.showTableRank}
                                        showcheck={props.showTableCheck}
                                        openUpdatePatternDlg={props.openUpdatePatternDlg} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row className="div-lineadd" id="divBelow"
                            style={{backgroundColor: "#c6d6f7"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catBelow">
                                        {props.txtBelow}
                                    </Col>
                                </Row>
                                <Row id="lvBelow">
                                    <PIUTableObj list={props.arrBelow}
                                            key="be"
                                            lang={props.lang}
                                            showrank={props.showTableRank}
                                            showcheck={props.showTableCheck}
                                            openUpdatePatternDlg={props.openUpdatePatternDlg} />
                                </Row>
                            </Col>
                        </Row>
                        
                        <Row id="divRandom"
                            style={{backgroundColor: "#ab95d4"}}>
                            <Col xs="12">
                                <Row>
                                    <Col xs="12" className="piu-left" id="catRandom">
                                        {props.txtRandom}
                                    </Col>
                                </Row>
                                <Row id="lvRandom">
                                    <PIUTableObj list={props.arrRandom}
                                            key="rd"
                                            lang={props.lang}
                                            showrank={props.showTableRank}
                                            showcheck={props.showTableCheck}
                                            openUpdatePatternDlg={props.openUpdatePatternDlg} />
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default TableWrapper;