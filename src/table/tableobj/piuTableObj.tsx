import React, {Component, Fragment} from 'react';

import { Col, Row } from 'reactstrap';
import CommonData from '../../piutable/commonData';
import { MusicData } from '../data/musicdataType';

interface Props {
    list: Array<MusicData>,
    lang: string,
    key: string,
    showcheck: boolean,
    showrank: boolean,
    openUpdatePatternDlg: (ptid: number, title: string) => void
}

const PIUTableObj = (props: Props) => {
    return (
        <Fragment>
            {
                props.list.map((d, i) => {
                    const title = (props.lang === "ko") ? d.title_ko : d.title_en;

                    return (
                        <Fragment>
                            <Col key={props.key+i} xs="3" sm="2" xl="1" className="div-pattern">
                                <span data-songtype={d.songtype}></span>
                                <Row className="nowrap">
                                    <Col xs="12" className="text-center nowrap">
                                        <input
                                            className="nowrap div-chkbox"
                                            style={{
                                                display: props.showcheck ? "inline":"none"
                                            }}
                                            type="checkbox" id="ptnsel" value={d.ptid} />
                                    </Col>
                                </Row>
                                <Row className="nowrap">
                                    <Col xs="12" className="nowrap"
                                        style={{
                                            backgroundOrigin: "content-box",
                                            backgroundImage: "url('"+CommonData.imgUrl+d.musicid+".png'),"+
                                                                "url('"+CommonData.imgUrl+"empty.jpg')",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "100%"
                                        }}
                                        onClick={() => props.openUpdatePatternDlg(d.ptid, title)}>
                                            {
                                                // steptype 1 or 2
                                                (function() {
                                                    let steptypeImg = "";
                                                    if(d.steptype === 1) {
                                                        steptypeImg = "half";
                                                    }
                                                    else if(d.steptype === 2) {
                                                        steptypeImg = "perf";
                                                    }
                                                    else {
                                                        return null;
                                                    }
                                                    
                                                    return (
                                                        <img alt="steptype" style={{width:"20%", top:"0px", position: "absolute", left: "0px"}}
                                                            src={process.env.PUBLIC_URL+"/img/"+steptypeImg+".png"} />
                                                    )
                                                })()
                                            }
                                            {
                                                // version
                                                (function() {
                                                    let ver = "";
                                                    switch(d.version) {
                                                        case 1: ver = "1st"; break;
                                                        case 2: ver = "2nd"; break;
                                                        case 3: ver = "obg"; break;
                                                        case 4: ver = "obgse"; break;
                                                        case 5: ver = "pc"; break;
                                                        case 6: ver = "extra"; break;
                                                        case 7: ver = "rebirth"; break;
                                                        case 8: ver = "prex3"; break;
                                                        case 9: ver = "exceed"; break;
                                                        case 10: ver = "exceed2"; break;
                                                        case 11: ver = "zero"; break;
                                                        case 12: ver = "nx"; break;
                                                        case 13: ver = "nx2"; break;
                                                        case 14: ver = "nxa"; break;
                                                        case 15: ver = "f1"; break;
                                                        case 16: ver = "fex"; break;
                                                        case 17: ver = "f2"; break;
                                                        case 18: ver = "p1"; break;
                                                        case 19: ver = "p2"; break;
                                                        case 20: ver = "xx"; break;
                                                        default: ver = ""; break;
                                                    }

                                                    if(ver !== "") {
                                                        return (
                                                            <img alt="version" style={{width: "40%", position: "absolute",
                                                                right: "0px", bottom: "0px"}}
                                                                src={process.env.PUBLIC_URL+"/img/ver/"+ver+".png"} />
                                                        )
                                                    }
                                                    else return null;
                                                })()
                                            }
                                            {
                                                // new
                                                (function() {
                                                    if(d.newpattern === 1) {
                                                        return (
                                                            <img alt="new" style={{width: "40%", position: "absolute",
                                                                left: "0px", bottom: "0px"}}
                                                                src={process.env.PUBLIC_URL+"/img/new.png"} />
                                                        )
                                                    }
                                                    else return null;
                                                })()
                                            }
                                            <div className="rank" id={"cs"+d.ptid} style={{height: "0px",
                                                        display: props.showrank ? "block":"none"}}>
                                                <img alt="rank"
                                                    style={{width: "50%",
                                                        position: "absolute",
                                                        right: "0px",
                                                        top: "0px"}}
                                                    src={process.env.PUBLIC_URL+"/img/grade_"+d.rank+".png"} />
                                            </div>
                                            <img alt="jacket" src={CommonData.imgUrl+d.musicid+".png"}
                                                onError={(e) => {e.currentTarget.src = process.env.PUBLIC_URL+"/img/empty.jpg"}}
                                                style={{width: "100%"}} />
                                    </Col>
                                </Row>
                                <Row className="nowrap">
                                    <Col xs="12" className="text-center nowrap">
                                        <a href="#no_div"
                                            onClick={() => props.openUpdatePatternDlg(d.ptid, title)}>
                                            <p className="link-style2">{title}</p>
                                        </a>
                                    </Col>
                                </Row>
                            </Col>
                        </Fragment>
                    )
                })
            }

        </Fragment>
    );
}

export default PIUTableObj;