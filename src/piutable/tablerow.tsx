import React, {Component, Fragment} from 'react';
import MusicInfo from './MusicInfo';

import { Col } from 'reactstrap';

const piuimg = "https://piu.nira.one/jacket/";

interface Props {
    list: Array<MusicInfo>,
    lang: string,
    key: string,
    showcheck: boolean,
    showrank: boolean,
    updatePatternDialog: (ptid: number, title: string) => void
}

class PIUTableObj extends Component<Props> {
    render() {
        const self = this;
        const prop = this.props;

        return (
            <Fragment>
                {
                    this.props.list.map((d, i) => {
                        const title = (prop.lang === "ko") ? d.titleko : d.titleen;

                        return (
                            <Fragment>
                                <Col key={prop.key+i} xs="3" sm="2" xl="1" className="div-pattern">
                                    <input style={{transform: "scale(2)", left: "48%",
                                            display: self.props.showcheck ? "block":"none"}}
                                        type="checkbox" id="ptnsel" value={d.ptid} />
                                    <span data-songtype={d.songtype}></span>
                                    
                                    <div style={{
                                        backgroundOrigin: "content-box",
                                        backgroundImage: "url('"+piuimg+d.musicid+".png'),"+
                                                            "url('"+piuimg+"empty.jpg')",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "100%"
                                    }}
                                    onClick={() => self.props.updatePatternDialog(d.ptid, title)}>
                                        {
                                            // if steptype 1 or 2
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
                                                    <img style={{width:"40%", top:"30px", position: "absolute", left: "0px"}}
                                                        src={process.env.PUBLIC_URL+"/img/"+steptypeImg+".png"} />
                                                )
                                            })()
                                        }
                                        {
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
                                                        <img style={{width: "40%", position: "absolute",
                                                            right: "0px", top: "15px"}}
                                                            src={process.env.PUBLIC_URL+"/img/ver/"+ver+".png"} />
                                                    )
                                                }
                                                else return null;
                                            })()
                                        }
                                        {
                                            (function() {
                                                if(d.new === 1) {
                                                    return (
                                                        <img style={{width: "40%", position: "absolute",
                                                            left: "0px", top: "15px"}}
                                                            src={process.env.PUBLIC_URL+"/img/new.png"} />
                                                    )
                                                }
                                                else return null;
                                            })()
                                        }
                                        <div className="rank" id={"cs"+d.ptid} style={{height: "0px"}}>
                                            <img style={{width: "60%",
                                                    position: "absolute",
                                                    right: "0px",
                                                    top: "30px",
                                                    display: self.props.showrank ? "block":"none"}}
                                                src={process.env.PUBLIC_URL+"/img/grade_"+d.rank+".png"} />
                                        </div>
                                        <img src={piuimg+d.musicid+".png"}
                                            onError={(e) => {e.currentTarget.src = d.piuimg+"empty.jpg"}}
                                            style={{width: "100%", visibility: "hidden"}} />
                                    </div>
                                    <a className="innerhref" href="#no_div"
                                        onClick={() => self.props.updatePatternDialog(d.ptid, title)}>
                                        <b>{title}</b>
                                    </a>
                                </Col>
                            </Fragment>
                        )
                    })
                }

            </Fragment>
        )
    }
}

export default PIUTableObj;