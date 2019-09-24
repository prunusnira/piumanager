import React, {Component} from 'react';
import axios from 'axios';
import txtPIU from './txtpiu';
import './piu-custom.css';
import UserDialog from './UserInfoDialog';
import PatternUpdateDialog from './PatternUpdateDialog';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';
import PIUTableObj from './tablerow';

const userstat = new Map();
const lang = "ko";
const piuDataUrl = "https://data.gitadora.info/piu/data/";

const arrOV = [];
const arrHI = [];
const arrNH = [];
const arrNR = [];
const arrNE = [];
const arrEZ = [];
const arrBE = [];
const arrRD = [];

let cntov = 0;
let cnthi = 0;
let cntnh = 0;
let cntnr = 0;
let cntne = 0;
let cntez = 0;
let cntbe = 0;
let cntrd = 0;

class PIUTable extends Component {
    constructor(props) {
        super(props);

        this.newUserHandler = this.newUserHandler.bind(this);
        this.newUser = this.newUser.bind(this);
        this.updatePatternDialog = this.updatePatternDialog.bind(this);
        this.updateData = this.updateData.bind(this);
        this.rankreset = this.rankreset.bind(this);
        this.updateRankData = this.updateRankData.bind(this);

        this.state = {
            // userinfo
            username: "",
            userlv: 0,
            userrank: "",

            // rank
            ranksss: 0,
            rankss: 0,
            ranks: 0,
            ranka: 0,
            rankao: 0,
            rankbcd: 0,
            rankbcdo: 0,
            rankf: 0,
            ranknp: 0,
            all: 0,

            // musictype
            musarcade: true,
            musshort: true,
            musfull: true,
            muxremix: true,

            ptidlist: [],

            // screen and dialog
            loaded: false,
            newuser: false,
            changerank: false,
            pattern: false,

            // category text
            catOV: "",
            catHD: "",
            catNH: "",
            catNR: "",
            catNE: "",
            catEZ: "",
            catBE: "",
            catRD: "",

            // current page
            steptype: "",
            steplv: 0,

            // update pt info
            updaterank: "",
            currentpt: 0,
            isOver: false
        }
    }

    newUser() {
        this.setState({
            newuser: !this.state.newuser
        });
    }

    newUserHandler(name, lv) {
        this.setState({
            username: name,
            userlv: lv,
            loaded: true
        });
    }

    loadUser() {
        // 파일 열기 대화상자를 열고 데이터를 가져옴
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert(txtPIU.loadwarn[lang]);
        }

        const self = this;
        const fileopen = document.getElementById("fileopen");
        //$("#fileopen").trigger("click");
        fileopen.click();
        fileopen.onchange = function(e) {
            self.handleFileSelect(e.srcElement.files[0]);
            // 데이터 열기
            self.setState({
                loaded: true
            });
        }
    }

    handleFileSelect(file) {
        const self = this;
        const fr = new FileReader();
        fr.onload = function(e) {
            const result = e.target.result;
            self.callbackOpen(result);
        };
        fr.readAsText(file);
    }
    
    callbackOpen(result) {
        const str = result.split("\n");
        
        const userinfo = str[0].split(",");
        
        for(let i = 1; i < str.length; i++) {
            const cur = str[i].split(",");
            if(cur[0] != "")
                userstat.set(cur[0], cur[1]);
        }

        this.setState({
            username: userinfo[0],
            userlv: userinfo[1],
            loaded: true
        });
    }

    saveUser() {

    }

    getPatterns(type, level) {
        let catrd = "";
        let catbe = "";
        let catez = "";
        let catne = "";
        let catnr = "";
        let catnh = "";
        let cathi = "";
        let catov = "";
        let steptype = "";
        let steplv = "";

        if(type == "d" && level == "25") {
            axios.post(piuDataUrl+"/over/"+type)
            .then((res) => {
                this.updateTable(res.data, true);
                steptype = "Double";
                steplv = level+" Over";
                catez = "25 E";
                catne = "25 N";
                catnr = "25 H";
                catnh = level+1;
                cathi = level+2;
                catov = level+3;
            });
        }
        else if(type == 's' && level == '24') {
            axios.post(piuDataUrl+"/over/"+type)
            .then((res) => {
                this.updateTable(res.data, true);
                steptype = "Single";
                steplv = level+" Over";
                catnh = level+1;
                cathi = level+2;
                catov = level+3;
            });
        }
        else {
            axios.post(piuDataUrl+"/"+type+"/"+level)
            .then((res) => {
                this.updateTable(res.data, false);
                if(type == "s") steptype = "Single";
                if(type == "d") steptype = "Double";
                steplv = level;
                catrd = txtPIU.diff.random[lang];
                catbe = (level*1-1)+txtPIU.diff.below[lang];
                catez = txtPIU.diff.easy[lang];
                catne = txtPIU.diff.ne[lang];
                catnr = txtPIU.diff.normal[lang];
                catnh = txtPIU.diff.nh[lang];
                cathi = txtPIU.diff.high[lang];
                catov = (level*1+1)+txtPIU.diff.over[lang];
            });
        }
    
        if(cntov === 0) catov = "";
        if(cnthi === 0) cathi = "";
        if(cntnh === 0) catnh = "";
        if(cntnr === 0) catnr = "";
        if(cntne === 0) catne = "";
        if(cntez === 0) catez = "";
        if(cntbe === 0) catbe = "";
        if(cntrd === 0) catrd = "";

        this.setState({
            catOV: catov,
            catHD: cathi,
            catNH: catnh,
            catNR: catnr,
            catNE: catne,
            catEZ: catez,
            catBE: catbe,
            catRD: catrd,
            steptype: steptype,
            steplv: steplv
        });
    
        //checkboxReset();
        /*
        $("input:checkbox[id='musarcade']").prop('checked', true);
        $("input:checkbox[id='musshort']").prop('checked', true);
        $("input:checkbox[id='musfull']").prop('checked', true);
        $("input:checkbox[id='musremix']").prop('checked', true);
        */
    }

    updateTable(data, isOver) {
        arrOV.length = 0;
        arrHI.length = 0;
        arrNH.length = 0;
        arrNR.length = 0;
        arrNE.length = 0;
        arrEZ.length = 0;
        arrBE.length = 0;
        arrRD.length = 0;
    
        cntov = 0;
        cnthi = 0;
        cntnh = 0;
        cntnr = 0;
        cntne = 0;
        cntez = 0;
        cntbe = 0;
        cntrd = 0;
    
        const ptidlist = [];
        let all = 0;
        
        for(let i = 0; i < data.patterns.length; i++) {
            const current = data.patterns[i];
            ptidlist.push(current.ptid);
            all++;

            const obj = {};
    
            if(current.removed == 0) {
                obj.songtype = current.songtype;
                obj.ptid = current.ptid;
                obj.titleko = current.title_ko;
                obj.titleen = current.title_en;
                obj.musicid = current.musicid;
                obj.steptype = current.steptype;
                obj.rank = "np";

                if(isOver) {
                    if(current.type == 0) {
                        switch(current.lv) {
                        case 24:
                            cntnh++;
                            arrNH.push(obj);
                            break;
                        case 25:
                            cnthi++;
                            arrHI.push(obj);
                            break;
                        case 26:
                            cntov++;
                            arrOV.push(obj);
                            break;
                        }
                    }
                    if(current.type == 1) {
                        switch(current.lv) {
                        case 25:
                            if(current.difftype == 1) {
                                cntez++;
                                arrEZ.push(obj);
                            }
                            if(current.difftype == 2) {
                                cntne++;
                                arrNE.push(obj);
                            }
                            if(current.difftype == 3) {
                                cntnr++;
                                arrNR.push(obj);
                            }
                            break;
                        case 26:
                            cntnh++;
                            arrNH.push(obj);
                            break;
                        case 27:
                            cnthi++;
                            arrHI.push(obj);
                            break;
                        case 28:
                            cntov++;
                            arrOV.push(obj);
                            break;
                        }
                    }
                }
                else {
                    if(userstat.has(current.ptid)) {
                        switch(userstat.get(current.ptid.toString())) {
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
                    
                    switch(current.difftype) {
                    case 0:
                        cntbe++;
                        arrBE.push(obj);
                        break;
                    case 1:
                        cntez++;
                        arrEZ.push(obj);
                        break;
                    case 2:
                        cntne++;
                        arrNE.push(obj);
                        break;
                    case 3: // 2->3
                        cntnr++;
                        arrNR.push(obj);
                        break;
                    case 4:
                        cntnh++;
                        arrNH.push(obj);
                        break;
                    case 5: // 3->5
                        cnthi++;
                        arrHI.push(obj);
                        break;
                    case 6: // 4->6
                        cntov++;
                        arrOV.push(obj);
                        break;
                    case 7: // 5->7
                        cntrd++;
                        arrRD.push(obj);
                        break;
                    }
                }
            }
        }

        this.setState({
            ptidlist: ptidlist,
            all: all,
            isOver: isOver
        });
    }

    rankreset() {
        this.setState({
            ranksss: 0,
            rankss: 0,
            ranks: 0,
            ranka: 0,
            rankao: 0,
            rankbcd: 0,
            rankbcdo: 0,
            rankf: 0,
            ranknp: 0
        });
    }

    updateRankData() {
        let ranksss = 0;
        let rankss = 0;
        let ranks = 0;
        let ranka = 0;
        let rankao = 0;
        let rankbcdo = 0;
        let rankf = 0;
        let rankbcd = 0;

        for(let i = 0; i < this.state.ptidlist.length; i++) {
            if(userstat.has(this.state.ptidlist[i].toString())) {
                switch(userstat.get(this.state.ptidlist[i].toString())) {
                case "0":
                    ranksss++;
                    break;
                case "1":
                    rankss++;
                    break;
                case "2":
                    ranks++;
                    break;
                case "3":
                    ranka++;
                    break;
                case "4":
                    rankao++;
                    break;
                case "5":
                    rankbcdo++;
                    break;
                case "6":
                    rankf++;
                    break;
                case "8":
                    rankbcd++;
                    break;
                }
            }
        }

        this.setState({
            ranksss: ranksss,
            rankss: rankss,
            ranks: ranks,
            ranka: ranka,
            rankao: rankao,
            rankbcd: rankbcd,
            rankbcdo: rankbcdo,
            rankf: rankf
        }, () => {
            this.updateRanks();
        });
    }

    updateRanks() {
        const st = this.state;
        this.setState({
            userrank: "SSS: "+st.ranksss+" | "+
                    "SS: "+st.rankss+" | "+
                    "S: "+st.ranks+" | "+
                    "A: "+st.ranka+" | "+
                    "BCD: "+st.rankbcd+"<br/>"+
                    "A: "+st.rankao+" (Break Off) | "+
                    "BCD: "+st.rankbcdo+" (Break Off) | "+
                    "F: "+st.rankf+" | "+
                    "No Play: "+(st.all-st.ranksss-st.rankss-st.ranks-st.ranka-st.rankao-st.rankbcd-st.rankbcdo-st.rankf)
        });
    }

    updateData(ptid, rank) {
        userstat.set(ptid.toString(), rank);
        this.updateRecord(ptid);
        this.rankreset();
        this.updateRankData();
    }

    updatePatternDialog(ptid, title) {
        const self = this;
        this.setState({
            pattern: !self.state.pattern,
            currentpt: ptid
        });
    }

    updateRecord(ptid) {
        const div = document.getElementById("cs"+ptid);
        const rankval = userstat.get(ptid.toString());

        let rank = "";
        switch(parseInt(rankval)) {
            case 0: rank = "ss"; break;
            case 1: rank = "gs"; break;
            case 2: rank = "s"; break;
            case 3: rank = "aon"; break;
            case 4: rank = "aoff"; break;
            case 5: rank = "bcdon"; break;
            case 6: rank = "f"; break;
            case 7: rank = "np"; break;
            case 8: rank = "bcdoff"; break;
        }

        div.innerHTML = "\
            <img style='width: 60%; position: 'absolute';\
                right: '0px' src='"+process.env.PUBLIC_URL+"/img/grade_"+rank+".png' />";
    }

    render() {
        const self = this;

        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>Pump It Up XX</h3>
                                <p>{txtPIU.subtitle[lang]}</p>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" id="howto">
                                    {txtPIU.howto1[lang]}<br/>
                                    1. {txtPIU.howto2[lang]}<br/>
                                    2. <b><font color='red'>{txtPIU.howto3[lang]}</font></b><br/>
                                    3. {txtPIU.howto4[lang]}<br/>
                                    4. {txtPIU.howto5[lang]}<br/>
                                    5. {txtPIU.howto6[lang]}
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{txtPIU.functitle[lang]}</h3>
                            </CardHeader>
                            <CardBody className="text-center btn-group">
                                <Button onClick={() => self.newUser()}>
                                    {txtPIU.newuser[lang]}
                                </Button>

                                <Button onClick={() => self.loadUser()}>
                                    {txtPIU.load[lang]}
                                </Button>
                                <Button onClick={() => self.saveUser()}>
                                    {txtPIU.save[lang]}
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card>
                            <CardHeader id="seldiffSingletitle">
                                <h3>{txtPIU.single[lang]}</h3>
                            </CardHeader>
                            <CardBody className="text-center" id="seldiffSingle">
                                <Button onClick={() => self.getPatterns('s', '13')}>S13</Button>
                                <Button onClick={() => self.getPatterns('s', '14')}>S14</Button>
                                <Button onClick={() => self.getPatterns('s', '15')}>S15</Button>
                                <Button onClick={() => self.getPatterns('s', '16')}>S16</Button>
                                <Button onClick={() => self.getPatterns('s', '17')}>S17</Button>
                                <Button onClick={() => self.getPatterns('s', '18')}>S18</Button>
                                <Button onClick={() => self.getPatterns('s', '19')}>S19</Button>
                                <Button onClick={() => self.getPatterns('s', '20')}>S20</Button>
                                <Button onClick={() => self.getPatterns('s', '21')}>S21</Button>
                                <Button onClick={() => self.getPatterns('s', '22')}>S22</Button>
                                <Button onClick={() => self.getPatterns('s', '23')}>S23</Button>
                                <Button onClick={() => self.getPatterns('s', '24')}>S24 over</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card>
                            <CardHeader id="seldiffDoubletitle">
                                <h3>{txtPIU.double[lang]}</h3>
                            </CardHeader>
                            <CardBody className="text-center" id="seldiffDouble">
                                <Button onClick={() => self.getPatterns('d', '13')}>D13</Button>
                                <Button onClick={() => self.getPatterns('d', '14')}>D14</Button>
                                <Button onClick={() => self.getPatterns('d', '15')}>D15</Button>
                                <Button onClick={() => self.getPatterns('d', '16')}>D16</Button>
                                <Button onClick={() => self.getPatterns('d', '17')}>D17</Button>
                                <Button onClick={() => self.getPatterns('d', '18')}>D18</Button>
                                <Button onClick={() => self.getPatterns('d', '19')}>D19</Button>
                                <Button onClick={() => self.getPatterns('d', '20')}>D20</Button>
                                <Button onClick={() => self.getPatterns('d', '21')}>D21</Button>
                                <Button onClick={() => self.getPatterns('d', '22')}>D22</Button>
                                <Button onClick={() => self.getPatterns('d', '23')}>D23</Button>
                                <Button onClick={() => self.getPatterns('d', '24')}>D24</Button>
                                <Button onClick={() => self.getPatterns('d', '25')}>D25 over</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card id="userinfo">
                            <CardHeader>
                                <h3>User Info and Options</h3>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6" className="text-right">
                                        User Name {self.state.username}
                                    </Col>
                                    <Col xs="6" className="text-left" id="username">
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col xs="6" className="text-right">
                                        PIU XX Level {self.state.userlv}
                                    </Col>
                                    <Col xs="6" className="text-left" id="userlv">
                                    </Col>
                                </Row>

                                <Row className="text-center">
                                    <Col xs="12" className="text-center">
                                        <Button onClick={() => self.editUser()}>
                                            {txtPIU.edit[lang]}
                                        </Button>
                                        <Button onClick={() => self.updatePatternMultiple()}>
                                            {txtPIU.updatecheckedbtn[lang]}
                                        </Button>
                                        <Button onClick={() => self.hideCheckbox()}>
                                            {txtPIU.hidechkbox[lang]}
                                        </Button>
                                        <Button onClick={() => self.hideRank()}>
                                            {txtPIU.hiderank[lang]}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <h3>{txtPIU.songtype[lang]}</h3>
                            </CardHeader>
                            <CardBody className="text-center">
                                <input id="musarcade" type="checkbox" value="musarcade"
                                    onChange={() => self.handleMusicType(this, 0)} checked/>
                                <label htmlFor="musarcade">Arcade</label>
                                <input id="musshort" type="checkbox" value="musshort"
                                    onChange={() => self.handleMusicType(this, 1)} checked/>
                                <label htmlFor="musshort">Shortcut</label>
                                <input id="musfull" type="checkbox" value="musfull"
                                    onChange={() => self.handleMusicType(this, 2)} checked/>
                                <label htmlFor="musfull">Fullsong</label>
                                <input id="musremix" type="checkbox" value="musremix"
                                    onChange={() => self.handleMusicType(this, 3)} checked/>
                                <label htmlFor="musremix">Remix</label>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card id="targetTable">
                            <CardHeader className="text-center">
                                <Col xs="12">
                                    <h3>Pump It Up XX</h3>
                                    <h4><span id="type"></span> Lv.<span id="lv"></span> Clear Table</h4>
                                </Col>
                                <Col xs="12" id="username2">
                                    Player: {self.state.username} / Lv. {self.state.userlv}
                                </Col>
                                <Col xs="12" id="ranks"></Col>
                            </CardHeader>
                            <CardBody>
                                <Row className="div-lineadd" id="divOver"
                                    style={{backgroundColor: "#8a0273"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catOver">
                                                {self.state.catOV}
                                            </Col>
                                        </Row>
                                        <Row id="lvOver">
                                            <PIUTableObj list={arrOV}
                                                    key="ov"
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                            
                                <Row className="div-lineadd" id="divHigh"
                                    style={{backgroundColor: "#790202"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catHigh">
                                                {self.state.catHD}
                                            </Col>
                                        </Row>
                                        <Row id="lvHigh">
                                            <PIUTableObj list={arrHI}
                                                    key="hi"
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row className="div-lineadd" id="divNH"
                                    style={{backgroundColor: "#8a5301"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catNH">
                                                {self.state.catNH}
                                            </Col>
                                        </Row>
                                        <Row id="lvNH">
                                            <PIUTableObj list={arrNH}
                                                    key="nh"
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row className="div-lineadd" id="divNormal"
                                    style={{backgroundColor: "#8a8a01"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catNormal">
                                                {self.state.catNR}
                                            </Col>
                                        </Row>
                                        <Row id="lvNormal">
                                            <PIUTableObj list={arrNR}
                                                    key="nr"
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                    
                                <Row className="div-lineadd" id="divNE"
                                    style={{backgroundColor: "#028502"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catNE">
                                                {self.state.catNE}
                                            </Col>
                                        </Row>
                                        <Row id="lvNE">
                                            <PIUTableObj list={arrNE}
                                                    key="ne"
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row className="div-lineadd" id="divEasy"
                                    style={{backgroundColor: "#009494"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catEasy">
                                                {self.state.catEZ}
                                            </Col>
                                        </Row>
                                        <Row id="lvEasy">
                                            <PIUTableObj list={arrEZ}
                                                    key="ez"
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row className="div-lineadd" id="divBelow"
                                    style={{backgroundColor: "#00007e"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catBelow">
                                                {self.state.catBE}
                                            </Col>
                                        </Row>
                                        <Row id="lvBelow">
                                            <PIUTableObj list={arrBE}
                                                    key="be"
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row id="divRandom" style={{backgroundColor: "#43008f"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catRandom">
                                                {self.state.catRD}
                                            </Col>
                                        </Row>
                                        <Row id="lvRandom">
                                            <PIUTableObj list={arrRD}
                                                    key="rd"
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
                <input id="fileopen" accept=".csv" type="file"
                    name="fileopen" style={{display:"none"}} />

                <UserDialog title={txtPIU.newuserdiv[lang]}
                    button={txtPIU.newuserbtn[lang]}
                    display={self.state.newuser}
                    handler={self.newUserHandler}
                    toggle={self.newUser} />
                <PatternUpdateDialog title={txtPIU.updatedivtitle[lang]}
                    button={txtPIU.update[lang]}
                    handler={self.patternHandler}
                    display={self.state.pattern}
                    ptid={self.state.currentpt}
                    updateData={self.updateData}
                    updatePatternDialog={self.updatePatternDialog} />
            </Container>
        )
    }
}

export default PIUTable;