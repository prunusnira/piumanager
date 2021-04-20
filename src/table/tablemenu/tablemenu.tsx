import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import TxtTableMenu from './txtTablemenu';
import { MusicData } from '../data/musicdataType';
import CommonData from '../../piutable/commonData';

interface TableMenuProps {
    lang: string,
    isLoaded: boolean,
    userStatus: Map<number, string>,

    arrOver: Array<MusicData>,
    arrHigh: Array<MusicData>,
    arrNh: Array<MusicData>,
    arrNormal: Array<MusicData>,
    arrNe: Array<MusicData>,
    arrEasy: Array<MusicData>,
    arrBelow: Array<MusicData>,
    arrRandom: Array<MusicData>,

    setArrOver: (arr: Array<MusicData>) => void,
    setArrHigh: (arr: Array<MusicData>) => void,
    setArrNh: (arr: Array<MusicData>) => void,
    setArrNormal: (arr: Array<MusicData>) => void,
    setArrNe: (arr: Array<MusicData>) => void,
    setArrEasy: (arr: Array<MusicData>) => void,
    setArrBelow: (arr: Array<MusicData>) => void,
    setArrRandom: (arr: Array<MusicData>) => void,

    setTxtOver: (name: string) => void,
    setTxtHigh: (name: string) => void,
    setTxtNh: (name: string) => void,
    setTxtNormal: (name: string) => void,
    setTxtNe: (name: string) => void,
    setTxtEasy: (name: string) => void,
    setTxtBelow: (name: string) => void,
    setTxtRandom: (name: string) => void,

    showArcade: boolean,
    setShowAC: (s: boolean) => void,
    showShort: boolean,
    setShowSH: (s: boolean) => void,
    showFull: boolean,
    setShowFU: (s: boolean) => void,
    showRemix: boolean,
    setShowRM: (s: boolean) => void,

    setSDType: (type: string) => void,
    setDiffLv: (lv: number) => void,

    ptIdList: Array<number>,
    setPtIdList: (arr: Array<number>) => void,

    setUserDlg: (status: boolean) => void,
    setDlgTitle: (msg: string) => void,
    setDlgBtn: (msg: string) => void,

    showTableRank: boolean,
    showTableCheck: boolean,
    setShowTableRank: (c: boolean) => void,
    setShowTableCheck: (c: boolean) => void,

    updateData: (ptid: number, rank: string) => void,
    openUpdatePatternMultiple: () => void,
}

const TableMenu = (props: TableMenuProps) => {
    // 체크박스 등록/해제에 따른 effect
    useEffect(() => {
        musicTypeOnOff(0, "musarcade");
    }, [props.showArcade]);
    useEffect(() => {
        musicTypeOnOff(1, "musshort");
    }, [props.showShort]);
    useEffect(() => {
        musicTypeOnOff(2, "musfull");
    }, [props.showFull]);
    useEffect(() => {
        musicTypeOnOff(3, "musremix");
    }, [props.showRemix]);

    // 테이블 데이터 변경 이후에 수행하는 effect
    useEffect(() => {
        for(let i = 0; i < props.ptIdList.length; i++) {
            const ptid = props.ptIdList[i];

            if(props.userStatus.has(ptid)) {
                const rank = props.userStatus.get(ptid);
                props.updateData(ptid, rank!);
            }
        }
    }, [props.ptIdList]);

    const getPatterns = (type: string, level: number) => {
        props.setSDType(type === 's' ? 'Single' : 'Double');
        props.setDiffLv(level);

        // 테이블을 모두 리셋헤야함
        // 데이터는 다 저장되어 있음
        resetTable();

        if(type === "d" && level === 25) {
            axios.get(CommonData.dataUrl+'ptlist/'+type+"/"+level)
            .then((res) => {
                updateTable(res.data as Array<MusicData>, true);
                props.setTxtRandom('');
                props.setTxtBelow('');
                props.setTxtEasy('25 E');
                props.setTxtNe('25 N');
                props.setTxtNormal('25 H');
                props.setTxtNh('26');
                props.setTxtHigh('27');
                props.setTxtOver('28');
            });
        }
        else if(type === 's' && level === 24) {
            axios.get(CommonData.dataUrl+'ptlist/'+type+"/"+level)
            .then((res) => {
                updateTable(res.data as Array<MusicData>, true);
                props.setTxtRandom('');
                props.setTxtBelow('');
                props.setTxtEasy('');
                props.setTxtNe('');
                props.setTxtNormal('');
                props.setTxtNh('24');
                props.setTxtHigh('25');
                props.setTxtOver('26');
            });
        }
        else {
            axios.get(CommonData.dataUrl+'ptlist/'+type+"/"+level, {
                headers: {"Content-Type": "application/x-www.form-urlencoded"}
            })
            .then((res) => {
                updateTable(res.data as Array<MusicData>, false);
                props.setTxtRandom((TxtTableMenu.diff.random as any)[props.lang]);
                props.setTxtBelow((level-1)+(TxtTableMenu.diff.below as any)[props.lang]);
                props.setTxtEasy((TxtTableMenu.diff.easy as any)[props.lang]);
                props.setTxtNe((TxtTableMenu.diff.ne as any)[props.lang]);
                props.setTxtNormal((TxtTableMenu.diff.normal as any)[props.lang]);
                props.setTxtNh((TxtTableMenu.diff.nh as any)[props.lang]);
                props.setTxtHigh((TxtTableMenu.diff.high as any)[props.lang]);
                props.setTxtOver((level+1)+(TxtTableMenu.diff.over as any)[props.lang]);
            });
        }
    }

    const resetTable = () => {
        props.arrOver.splice(0, props.arrOver.length);
        props.arrHigh.splice(0, props.arrHigh.length);
        props.arrNh.splice(0, props.arrNh.length);
        props.arrNormal.splice(0, props.arrNormal.length);
        props.arrNe.splice(0, props.arrNe.length);
        props.arrEasy.splice(0, props.arrEasy.length);
        props.arrBelow.splice(0, props.arrBelow.length);
        props.arrRandom.splice(0, props.arrRandom.length);

        props.setArrOver(props.arrOver);
        props.setArrHigh(props.arrHigh);
        props.setArrNh(props.arrNh);
        props.setArrNormal(props.arrNormal);
        props.setArrNe(props.arrNe);
        props.setArrEasy(props.arrEasy);
        props.setArrBelow(props.arrBelow);
        props.setArrRandom(props.arrRandom);
    }

    const handleMusicType = (type: number) => {
        // show 변수 변경에 대한 effect는 최상단 useEffect에서 정의함
        switch(type) {
        case 0:
            props.setShowAC(!props.showArcade);
            break;
        case 1:
            props.setShowSH(!props.showShort);
            break;
        case 2:
            props.setShowFU(!props.showFull);
            break;
        case 3:
            props.setShowRM(!props.showRemix);
            break;
        }
    }

    const musicTypeOnOff = (type: number, bid: string) => {
        const box = document.getElementById(bid) as HTMLInputElement;
        const divs = document.querySelectorAll("[data-songtype='"+type+"']");
        if(box && box.checked) {
            for(let i = 0; i < divs.length; i++) {
                (divs[i].parentNode! as HTMLElement).style.display = "block";
            }
        }
        else {
            for(let i = 0; i < divs.length; i++) {
                (divs[i].parentNode! as HTMLElement).style.display = "none";
            }
        }
    }

    const updateTable = (data: Array<MusicData>, isOver: boolean) => {
        const ptidlist = [];

        const size = data.length;
        
        for(let i = 0; i < size; i++) {
            const current = data[i];
            ptidlist.push(current.ptid);

            let obj: MusicData = {
                ptid: 0,
                musicid: 0,
                title_en: '',
                title_ko: '',
                sdtype: 0,
                lv: 0,
                steptype: 0,
                difficulty: 0,
                songtype: 0,
                removed: 0,
                version: 0,
                newpattern: 0,
                rank: ''
            };
    
            if(current.removed === 0) {
                obj.ptid = current.ptid;
                obj.musicid = current.musicid;
                obj.title_en = current.title_en;
                obj.title_ko = current.title_ko;
                obj.sdtype = current.sdtype;
                obj.songtype = current.songtype;
                obj.steptype = current.steptype;
                obj.version = current.version;
                obj.newpattern = current.newpattern;
                obj.rank = "np";

                if(isOver) {
                    if(current.sdtype === 0) {
                        switch(current.lv) {
                        case 24:
                            props.arrNh.push(obj);
                            break;
                        case 25:
                            props.arrHigh.push(obj);
                            break;
                        case 26:
                            props.arrOver.push(obj);
                            break;
                        }
                    }
                    if(current.sdtype === 1) {
                        switch(current.lv) {
                        case 25:
                            if(current.difficulty === 1) {
                                props.arrEasy.push(obj);
                            }
                            if(current.difficulty === 2) {
                                props.arrNe.push(obj);
                            }
                            if(current.difficulty === 3) {
                                props.arrNormal.push(obj);
                            }
                            break;
                        case 26:
                            props.arrNh.push(obj);
                            break;
                        case 27:
                            props.arrHigh.push(obj);
                            break;
                        case 28:
                            props.arrOver.push(obj);
                            break;
                        }
                    }
                }
                else {
                    if(props.userStatus.has(current.ptid)) {
                        switch(props.userStatus.get(current.ptid)) {
                        case "0":
                            obj.rank = "ss";
                            break;
                        case "1":
                            obj.rank = "gs";
                            break;
                        case "2":
                            obj.rank = "s";
                            break;
                        case "3":
                            obj.rank = "aon";
                            break;
                        case "4":
                            obj.rank = "aoff";
                            break;
                        case "5":
                            obj.rank = "bcdoff";
                            break;
                        case "6":
                            obj.rank = "f";
                            break;
                        case "7":
                            obj.rank = "np";
                            break;
                        case "8":
                            obj.rank = "bcdon";
                            break;
                        }
                    }
                    
                    switch(current.difficulty) {
                    case 0:
                        props.arrBelow.push(obj);
                        break;
                    case 1:
                        props.arrEasy.push(obj);
                        break;
                    case 2:
                        props.arrNe.push(obj);
                        break;
                    case 3:
                        props.arrNormal.push(obj);
                        break;
                    case 4:
                        props.arrNh.push(obj);
                        break;
                    case 5:
                        props.arrHigh.push(obj);
                        break;
                    case 6:
                        props.arrOver.push(obj);
                        break;
                    case 7:
                        props.arrRandom.push(obj);
                        break;
                    }
                }
            }
        }

        props.setArrOver(props.arrOver);
        props.setArrHigh(props.arrHigh);
        props.setArrNh(props.arrNh);
        props.setArrNormal(props.arrNormal);
        props.setArrNe(props.arrNe);
        props.setArrEasy(props.arrEasy);
        props.setArrBelow(props.arrBelow);
        props.setArrRandom(props.arrRandom);
        props.setPtIdList(ptidlist);
    }

    const editUser = () => {
        props.setUserDlg(true);
        props.setDlgTitle((TxtTableMenu.edituserdiv as any)[props.lang]);
        props.setDlgBtn((TxtTableMenu.edituserbtn as any)[props.lang]);
    }

    const hideRank = () => {
        props.setShowTableRank(!props.showTableRank);
    }

    const hideCheckbox = () => {
        props.setShowTableCheck(!props.showTableCheck);
    }

    const TableTitle = styled.tr`
        color: white;
        background-color: rgb(37, 37, 37);
        height: 50px;
    `;

    return (
        <Row style={{display: props.isLoaded ? "block" : "none"}}>
            <Col xs="12">
                <Table>
                    <TableTitle id="seldiffSingletitle">
                        <td><h4>{(TxtTableMenu.menu as any)[props.lang]}</h4></td>
                    </TableTitle>
                </Table>

                <Row id="seldiffSingle">
                    <Col xs="12" md="6">
                        <Row>
                            <Col xs="12" className="text-center">
                                {(TxtTableMenu.patternsel as any)[props.lang]}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6" className="text-center">
                                SINGLE<br/>
                                <select className="form-control"
                                    onChange={(e) => getPatterns('s', parseInt(e.target.value))}>
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
                            <Col xs="6" className="text-center">
                                DOUBLE<br/>
                                <select className="form-control"
                                    onChange={(e) => getPatterns('d', parseInt(e.target.value))}>
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
                        </Row>
                    </Col>

                    <Col xs="12" md="6">
                        <Row>
                            <Col xs="12" className="text-center">
                                {(TxtTableMenu.menu as any)[props.lang]}
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col xs="12" className="text-center btn-group">
                                <Button color="secondary" outline style={{width:"50%"}} onClick={() => editUser()}>
                                    {(TxtTableMenu.edit as any)[props.lang]}
                                </Button>
                                <Button color="secondary" outline style={{width:"50%"}} onClick={() => props.openUpdatePatternMultiple()}>
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                    {(TxtTableMenu.updatecheckedbtn as any)[props.lang]}
                                </Button>
                            </Col>
                            <Col xs="12" className="text-center btn-group">
                                <Button color="secondary" outline style={{width:"50%"}} onClick={() => hideCheckbox()}>
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                    {(TxtTableMenu.display as any)[props.lang]}
                                </Button>
                                <Button color="secondary" outline style={{width:"50%"}} onClick={() => hideRank()}>
                                    {(TxtTableMenu.rank as any)[props.lang]}
                                    &nbsp;
                                    {(TxtTableMenu.display as any)[props.lang]}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="9" md="8" lg="6">
                        <Row>
                            <Col xs="12" className="text-center">
                                {(TxtTableMenu.songtype as any)[props.lang]}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="3" className="text-center">
                                <input id="musarcade" type="checkbox" value="musarcade"
                                    onChange={() => handleMusicType(0)}
                                    checked={props.showArcade} />
                                <label htmlFor="musarcade">Arcade</label>
                            </Col>
                            <Col xs="3" className="text-center">
                                <input id="musshort" type="checkbox" value="musshort"
                                    onChange={() => handleMusicType(1)}
                                    checked={props.showShort} />
                                <label htmlFor="musshort">Shortcut</label>
                            </Col>
                            <Col xs="3" className="text-center">
                                <input id="musfull" type="checkbox" value="musfull"
                                    onChange={() => handleMusicType(2)}
                                    checked={props.showFull} />
                                <label htmlFor="musfull">Fullsong</label>
                            </Col>
                            <Col xs="3" className="text-center">
                                <input id="musremix" type="checkbox" value="musremix"
                                    onChange={() => handleMusicType(3)}
                                    checked={props.showRemix} />
                                <label htmlFor="musremix">Remix</label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TableMenu;