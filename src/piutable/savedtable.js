import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import txtPIU from './txtpiu';
import './piu-custom.css';
import Lang from './language';
import html2canvas from 'html2canvas';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    Alert
} from 'reactstrap';
import PIUTableObj from './tablerow';

class SavedTable extends Component {
    lang = Lang.getLang();
    piuDataUrl = "https://piu.nira.one/d";
    //piuDataUrl = "http://localhost:8081/d";

    cntov = 0;
    cnthi = 0;
    cntnh = 0;
    cntnr = 0;
    cntne = 0;
    cntez = 0;
    cntbe = 0;
    cntrd = 0;

    constructor(props) {
        super(props);

        this.updatePatternDialog = this.updatePatternDialog.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateMultipleData = this.updateMultipleData.bind(this);
        this.rankreset = this.rankreset.bind(this);
        this.updateRankData = this.updateRankData.bind(this);

        this.state = {
            // userinfo
            username: "",
            userlv: 0,
            userrank1: "",
            userrank2: "",
            userstat: new Map(),
            userdlgTitle: "",
            userdlgButton: "",

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
            musremix: true,

            ptidlist: [],

            // screen and dialog
            showrank: true,
            showcheck: false,

            // category text
            category: {
                catOV: "",
                catHD: "",
                catNH: "",
                catNR: "",
                catNE: "",
                catEZ: "",
                catBE: "",
                catRD: ""
            },

            arrOV: [],
            arrHI: [],
            arrNH: [],
            arrNR: [],
            arrNE: [],
            arrEZ: [],
            arrBE: [],
            arrRD: [],

            // current page
            steptype: "",
            steplv: 0,
            songtype: 0,

            // update pt info
            updaterank: "",
            currentpt: 0,
            isOver: false
        }
    }

    componentDidMount() {
        this.loadFile(this.props.match.params);
    }

    loadFile(urlparam) {
        const self = this;
        axios.get(this.piuDataUrl+"/saved/"+urlparam.name+"/"+
                urlparam.type+"/"+urlparam.lv+"/"+urlparam.date)
            .then((res) => {
                const json = res.data;

                if(json.status === "ok") {
                    const table = JSON.parse(json.msg);
                    self.loadUserData(table.username, table.userlv);
                    self.loadTable(table.lvdata);
                    self.loadData(table.stat);
                }
                else if(json.status === "error") {

                }
            }
        );

        this.categoryUpdater(urlparam.type, urlparam.lv);
        self.setState({
            steptype: urlparam.type,
            steplv: urlparam.lv
        });
    }

    loadUserData(name, lv) {
        this.setState({
            username: name,
            userlv: lv
        });
    }

    loadTable(lvdata) {
        this.setState({
            arrOV: lvdata.ov,
            arrHI: lvdata.hi,
            arrNH: lvdata.nh,
            arrNR: lvdata.nr,
            arrNE: lvdata.ne,
            arrEZ: lvdata.ez,
            arrBE: lvdata.be,
            arrRD: lvdata.rd,
            all: lvdata.ov.length+
                lvdata.hi.length+
                lvdata.nh.length+
                lvdata.nr.length+
                lvdata.ne.length+
                lvdata.ez.length+
                lvdata.be.length+
                lvdata.rd.length
        });
    }

    loadData(stat) {
        const self = this;
        const ptidlist = [];
        const keys = Object.keys(stat);

        keys.forEach(function(e) {
            ptidlist.push(e);
            self.state.userstat.set(e, stat[e]);
            self.updateRecord(e);
        });
        
        this.updateRankData();
    }

    unixTimeToText(uxtime, onlyday = false) {
        const now = new Date(uxtime);
        let time = now.getFullYear()
            + ((now.getMonth()+1)<10?'0':'') + (now.getMonth()+1)
            + (now.getDate()<10?'0':'') + now.getDate();
        if(!onlyday) 
            time += "_"
                + now.getHours()
                + (now.getMinutes()<10?'0':'') + now.getMinutes()
                + (now.getSeconds()<10?'0':'') + now.getSeconds();
        return time;
    }

    setCategory(type, level) {
        const cat = {};
        let steptype = "";
        let steplv = "";

        // 테이블을 모두 리셋헤야함
        // 데이터는 다 저장되어 있음
        this.resetTable();

        if(type == "Double" && level == "25") {
            cat.catez = "25 E";
            cat.catne = "25 N";
            cat.catnr = "25 H";
            cat.catnh = parseInt(level)+1;
            cat.cathi = parseInt(level)+2;
            cat.catov = parseInt(level)+3;

            if(this.cntov === 0) cat.catov = "";
            if(this.cnthi === 0) cat.cathi = "";
            if(this.cntnh === 0) cat.catnh = "";
            if(this.cntnr === 0) cat.catnr = "";
            if(this.cntne === 0) cat.catne = "";
            if(this.cntez === 0) cat.catez = "";
            if(this.cntbe === 0) cat.catbe = "";
            if(this.cntrd === 0) cat.catrd = "";
        }
        else if(type == 'Single' && level == '24') {
            cat.catnh = parseInt(level);
            cat.cathi = parseInt(level)+1;
            cat.catov = parseInt(level)+2;

            if(this.cntov === 0) cat.catov = "";
            if(this.cnthi === 0) cat.cathi = "";
            if(this.cntnh === 0) cat.catnh = "";
            if(this.cntnr === 0) cat.catnr = "";
            if(this.cntne === 0) cat.catne = "";
            if(this.cntez === 0) cat.catez = "";
            if(this.cntbe === 0) cat.catbe = "";
            if(this.cntrd === 0) cat.catrd = "";
        }
        else {
            cat.catrd = txtPIU.diff.random[this.lang];
            cat.catbe = (parseInt(level)-1)+txtPIU.diff.below[this.lang];
            cat.catez = txtPIU.diff.easy[this.lang];
            cat.catne = txtPIU.diff.ne[this.lang];
            cat.catnr = txtPIU.diff.normal[this.lang];
            cat.catnh = txtPIU.diff.nh[this.lang];
            cat.cathi = txtPIU.diff.high[this.lang];
            cat.catov = (parseInt(level)+1)+txtPIU.diff.over[this.lang];

            if(this.cntov === 0) cat.catov = "";
            if(this.cnthi === 0) cat.cathi = "";
            if(this.cntnh === 0) cat.catnh = "";
            if(this.cntnr === 0) cat.catnr = "";
            if(this.cntne === 0) cat.catne = "";
            if(this.cntez === 0) cat.catez = "";
            if(this.cntbe === 0) cat.catbe = "";
            if(this.cntrd === 0) cat.catrd = "";
        }

        this.categoryUpdater(cat);
    }

    categoryUpdater(cat) {
        this.setState({
            catOV: cat.catov,
            catHD: cat.cathi,
            catNH: cat.catnh,
            catNR: cat.catnr,
            catNE: cat.catne,
            catEZ: cat.catez,
            catBE: cat.catbe,
            catRD: cat.catrd
        });
    }

    resetTable() {
        this.setState({
            arrOV: [],
            arrHI: [],
            arrNH: [],
            arrNR: [],
            arrNE: [],
            arrEZ: [],
            arrBE: [],
            arrRD: [],
            musarcade: true,
            musshort: true,
            musfull: true,
            musremix: true
        });
    
        this.cntov = 0;
        this.cnthi = 0;
        this.cntnh = 0;
        this.cntnr = 0;
        this.cntne = 0;
        this.cntez = 0;
        this.cntbe = 0;
        this.cntrd = 0;
    }

    updateTable(data, isOver) {
        const ptidlist = [];
        let all = 0;
        
        for(let i = 0; i < data.length; i++) {
            const current = data[i];
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
                            this.cntnh++;
                            this.state.arrNH.push(obj);
                            break;
                        case 25:
                            this.cnthi++;
                            this.state.arrHI.push(obj);
                            break;
                        case 26:
                            this.cntov++;
                            this.state.arrOV.push(obj);
                            break;
                        }
                    }
                    if(current.type == 1) {
                        switch(current.lv) {
                        case 25:
                            if(current.difftype == 1) {
                                this.cntez++;
                                this.state.arrEZ.push(obj);
                            }
                            if(current.difftype == 2) {
                                this.cntne++;
                                this.state.arrNE.push(obj);
                            }
                            if(current.difftype == 3) {
                                this.cntnr++;
                                this.state.arrNR.push(obj);
                            }
                            break;
                        case 26:
                            this.cntnh++;
                            this.state.arrNH.push(obj);
                            break;
                        case 27:
                            this.cnthi++;
                            this.state.arrHI.push(obj);
                            break;
                        case 28:
                            this.cntov++;
                            this.state.arrOV.push(obj);
                            break;
                        }
                    }
                }
                else {
                    if(this.state.userstat.has(current.ptid)) {
                        switch(this.state.userstat.get(current.ptid.toString())) {
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
                        this.cntbe++;
                        this.state.arrBE.push(obj);
                        break;
                    case 1:
                        this.cntez++;
                        this.state.arrEZ.push(obj);
                        break;
                    case 2:
                        this.cntne++;
                        this.state.arrNE.push(obj);
                        break;
                    case 3: // 2->3
                        this.cntnr++;
                        this.state.arrNR.push(obj);
                        break;
                    case 4:
                        this.cntnh++;
                        this.state.arrNH.push(obj);
                        break;
                    case 5: // 3->5
                        this.cnthi++;
                        this.state.arrHI.push(obj);
                        break;
                    case 6: // 4->6
                        this.cntov++;
                        this.state.arrOV.push(obj);
                        break;
                    case 7: // 5->7
                        this.cntrd++;
                        this.state.arrRD.push(obj);
                        break;
                    }
                }
            }
        }

        this.setState({
            ptidlist: ptidlist,
            all: all,
            isOver: isOver
        }, () => {
            const statmap = this.state.userstat;
            for(let i = 0; i < data.length; i++) {
                const ptid = data[i].ptid;

                if(statmap.has(ptid.toString())) {
                    const rank = statmap.get(ptid.toString());
                    this.updateData(ptid, rank);
                }
            }
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
            if(this.state.userstat.has(this.state.ptidlist[i].toString())) {
                switch(this.state.userstat.get(this.state.ptidlist[i].toString())) {
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
            userrank1: "SSS: "+st.ranksss+" | "+
                    "SS: "+st.rankss+" | "+
                    "S: "+st.ranks+" | "+
                    "A: "+st.ranka+" | "+
                    "BCD: "+st.rankbcd,
            userrank2: "A: "+st.rankao+" (Break Off) | "+
                    "BCD: "+st.rankbcdo+" (Break Off) | "+
                    "F: "+st.rankf+" | "+
                    "No Play: "+(st.all-st.ranksss-st.rankss-st.ranks-st.ranka-st.rankao-st.rankbcd-st.rankbcdo-st.rankf)
        });
    }

    updateData(ptid, rank) {
        this.state.userstat.set(ptid.toString(), rank);
        this.updateRecord(ptid);
        this.rankreset();
        this.updateRankData();

        // 창 닫기
        if(this.state.pattern) {
            this.updatePatternDialog(ptid);
        }
    }

    updateMultipleData(rank) {
        const checked = document.querySelectorAll("input[id=ptnsel]:checked");
        for(let i = 0; i < checked.length; i++) {
            const ptid = checked[i].value;
            this.state.userstat.set(ptid.toString(), rank);
            this.updateRecord(ptid);
        }
        this.rankreset();
        this.updateRankData();

        // 창 닫기
        if(this.state.pattern) {
            this.updatePatternDialog(0);
        }
    }

    updatePatternDialog(ptid) {
        this.setState({
            pattern: !this.state.pattern,
            currentpt: ptid,
            updatedlgType: 0,
            updatedlgTitle: txtPIU.updatedivtitle[this.lang]
        });
    }

    updatePatternMultiple() {
        this.setState({
            pattern: !this.state.pattern,
            updatedlgType: 1,
            updatedlgTitle: txtPIU.updatealldiv[this.lang]
        });
    }

    updateRecord(ptid) {
        //console.log(ptid);
        const div = document.getElementById("cs"+ptid);
        const rankval = this.state.userstat.get(ptid.toString());

        let rank = "";
        switch(parseInt(rankval)) {
            case 0: rank = "ss"; break;
            case 1: rank = "gs"; break;
            case 2: rank = "s"; break;
            case 3: rank = "aon"; break;
            case 4: rank = "aoff"; break;
            case 5: rank = "bcdoff"; break;
            case 6: rank = "f"; break;
            case 7: rank = "np"; break;
            case 8: rank = "bcdon"; break;
        }

        div.innerHTML = "\
            <img style='width: 60%; position: 'absolute';\
                right: '0px' src='"+process.env.PUBLIC_URL+"/img/grade_"+rank+".png' />";
    }

    hideRank() {
        this.setState({
            showrank: !this.state.showrank
        });
    }

    hideCheckbox() {
        this.setState({
            showcheck: !this.state.showcheck
        });
    }

    handleMusicType(type) {
        switch(type) {
        case 0:
            this.setState({
                musarcade: !this.state.musarcade
            }, () => this.musicTypeOnOff(0, "musarcade"));
            break;
        case 1:
            this.setState({
                musshort: !this.state.musshort
            }, () => this.musicTypeOnOff(1, "musshort"));
            break;
        case 2:
            this.setState({
                musfull: !this.state.musfull
            }, () => this.musicTypeOnOff(2, "musfull"));
            break;
        case 3:
            this.setState({
                musremix: !this.state.musremix
            }, () => this.musicTypeOnOff(3, "musremix"))
            break;
        }
    }

    musicTypeOnOff(type, bid) {
        const box = document.getElementById(bid);
        const divs = document.querySelectorAll("[data-songtype='"+type+"']");
        if(box.checked) {
            for(let i = 0; i < divs.length; i++) {
                divs[i].parentNode.style.display = "block";
            }
        }
        else {
            for(let i = 0; i < divs.length; i++) {
                divs[i].parentNode.style.display = "none";
            }
        }
    }

    scrShot(divname, filename) {
        window.scrollTo(0, 0);
        const div = document.getElementById(divname);
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

    render() {
        const self = this;

        const chback = {
            backgroundColor: 'rgb(37, 37, 37)'
        }

        return (
            <Container>
                <Alert onClose={() => console.log("")}>
                    <Row>
                        <Col xs="12" className="text-center">
                            <b><font color="black">{txtPIU.test[self.lang]}</font></b>
                        </Col>
                    </Row>
                </Alert>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader style={chback}>
                                <h3>Pump It Up XX</h3>
                                <p>{txtPIU.sharepage.subtitle[self.lang]}</p>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" id="howto">
                                    {txtPIU.sharepage.about1[self.lang]}<br/>
                                    {txtPIU.sharepage.about2[self.lang]} <Link className="innerhref" to="https://piu.nira.one">piu.nira.one</Link>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card id="userinfo">
                            <CardHeader style={chback}>
                                <h3>Options</h3>
                            </CardHeader>
                            <CardBody>
                                <Row className="text-center">
                                    <Col xs="12" className="btn-group text-center">
                                        <Button onClick={() => self.hideCheckbox()}>
                                            {txtPIU.hidechkbox[self.lang]}
                                        </Button>
                                        <Button onClick={() => self.hideRank()}>
                                            {txtPIU.hiderank[self.lang]}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader style={chback}>
                                <h3>{txtPIU.songtype[self.lang]}</h3>
                            </CardHeader>
                            <CardBody className="text-center">
                                <input id="musarcade" type="checkbox" value="musarcade"
                                    onChange={() => self.handleMusicType(0)}
                                    checked={self.state.musarcade} />
                                <label htmlFor="musarcade">Arcade</label>
                                <input id="musshort" type="checkbox" value="musshort"
                                    onChange={() => self.handleMusicType(1)}
                                    checked={self.state.musshort} />
                                <label htmlFor="musshort">Shortcut</label>
                                <input id="musfull" type="checkbox" value="musfull"
                                    onChange={() => self.handleMusicType(2)}
                                    checked={self.state.musfull} />
                                <label htmlFor="musfull">Fullsong</label>
                                <input id="musremix" type="checkbox" value="musremix"
                                    onChange={() => self.handleMusicType(3)}
                                    checked={self.state.musremix} />
                                <label htmlFor="musremix">Remix</label>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row id="targetTable">
                    <Col xs="12">
                        <Card>
                            <CardHeader className="text-center" style={chback}>
                                <Col xs="12">
                                    <h3>Pump It Up XX</h3>
                                    <h4>{self.state.steptype} Lv.{self.state.steplv} Clear Table</h4>
                                </Col>
                                <Col xs="12" id="username2">
                                    Player: {self.state.username} / Lv. {self.state.userlv}
                                </Col>
                                <Col xs="12" id="ranks">
                                    {self.state.userrank1}<br/>
                                    {self.state.userrank2}
                                </Col>
                            </CardHeader>
                            <CardBody>
                                <Row className="div-lineadd" id="divOver"
                                    style={{backgroundColor: "#ffadc5"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catOver">
                                                {self.state.catOV}
                                            </Col>
                                        </Row>
                                        <Row id="lvOver">
                                            <PIUTableObj list={self.state.arrOV}
                                                    key="ov"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                            
                                <Row className="div-lineadd" id="divHigh"
                                    style={{backgroundColor: "#ffa9b0"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catHigh">
                                                {self.state.catHD}
                                            </Col>
                                        </Row>
                                        <Row id="lvHigh">
                                            <PIUTableObj list={self.state.arrHI}
                                                    key="hi"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row className="div-lineadd" id="divNH"
                                    style={{backgroundColor: "#ffdda6"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catNH">
                                                {self.state.catNH}
                                            </Col>
                                        </Row>
                                        <Row id="lvNH">
                                            <PIUTableObj list={self.state.arrNH}
                                                    key="nh"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row className="div-lineadd" id="divNormal"
                                    style={{backgroundColor: "#f8e5d0"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catNormal">
                                                {self.state.catNR}
                                            </Col>
                                        </Row>
                                        <Row id="lvNormal">
                                            <PIUTableObj list={self.state.arrNR}
                                                    key="nr"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                    
                                <Row className="div-lineadd" id="divNE"
                                    style={{backgroundColor: "#a9e2c5"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catNE">
                                                {self.state.catNE}
                                            </Col>
                                        </Row>
                                        <Row id="lvNE">
                                            <PIUTableObj list={self.state.arrNE}
                                                    key="ne"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row className="div-lineadd" id="divEasy"
                                    style={{backgroundColor: "#bbd1e8"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catEasy">
                                                {self.state.catEZ}
                                            </Col>
                                        </Row>
                                        <Row id="lvEasy">
                                            <PIUTableObj list={self.state.arrEZ}
                                                    key="ez"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row className="div-lineadd" id="divBelow"
                                    style={{backgroundColor: "#c6d6f7"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catBelow">
                                                {self.state.catBE}
                                            </Col>
                                        </Row>
                                        <Row id="lvBelow">
                                            <PIUTableObj list={self.state.arrBE}
                                                    key="be"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <Row id="divRandom"
                                    style={{backgroundColor: "#ab95d4"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catRandom">
                                                {self.state.catRD}
                                            </Col>
                                        </Row>
                                        <Row id="lvRandom">
                                            <PIUTableObj list={self.state.arrRD}
                                                    key="rd"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
                                                    pattern={self.state.pattern}
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SavedTable;