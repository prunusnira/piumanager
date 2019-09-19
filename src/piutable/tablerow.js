import React, {Component, Fragment} from 'react';

import { Col } from 'reactstrap';

const piuimg = "https://data.gitadora.info/img/piumusic/";

class PIUTableObj extends Component {
    updatePattern() {

    }

    render() {
        const self = this;

        return (
            <Fragment>
                {
                    this.props.list.map((d, i) => {
                        return (
                            <Col xs="3" sm="2" className="div-pattern" style={{padding:"5px"}}>
                                <input style={{transform: "scale(2)", left: "48%"}}
                                    type="checkbox" id="ptnsel" value={d.ptid} />
                                <span data-songtype={d.songtype}></span>
                                
                                <a href="#no_div" onClick={() => self.updatePattern(d.ptid, d.titleko)}> {/* titleko */}
                                    <div style={{
                                        backgroundOrigin: "content-box",
                                        backgroundImage: "url('"+piuimg+d.musicid+".png'),"+
                                                            "url('"+piuimg+"empty.jpg')",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "100%"
                                    }}>
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
                                                    <div>
                                                        <img style={{width:"40%", position: "absolute", left: "0px"}}
                                                            src={process.env.PUBLIC_URL+"/img/"+steptypeImg+".png"} />
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="rank" id={"cs"+d.ptid}>
                                            <img style={{width: "60%",
                                                    position: "absolute",
                                                    right: "0px"}}
                                                src={process.env.PUBLIC_URL+"/img/grade_"+d.rank+".png"} />
                                        </div>
                                        <img src={piuimg+d.musicid+".png"}
                                            onError={(e) => {e.target.src = d.piuimg+"empty.jpg"}}
                                            style={{width: "100%", visibility: "hidden"}} />
                                    </div>
                                    <b><a className="innerhref" href="#no_div"
                                        onClick={() => self.updatePattern(d.ptid, d.titleko)}>
                                        {d.titleko}
                                    </a></b>
                                </a>
                            </Col>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default PIUTableObj;