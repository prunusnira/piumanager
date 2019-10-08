import React, {Component} from 'react';
import axios from 'axios';
import txtPIU from './txtpiu';
import './piu-custom.css';
import UserDialog from './UserInfoDialog';
import PatternUpdateDialog from './PatternUpdateDialog';
import Lang from './language';

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

class PIUTable extends Component {
    lang = Lang.getLang();
    piuDataUrl = "https://piu.gitadora.info/d";
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

        this.newUserHandler = this.newUserHandler.bind(this);
        this.newUser = this.newUser.bind(this);
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
            muxremix: true,

            ptidlist: [],

            // screen and dialog
            loaded: false,
            newuser: false,
            changerank: false,
            pattern: false,
            showrank: true,
            showcheck: true,

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

            // update pt info
            updaterank: "",
            currentpt: 0,
            isOver: false,
            updatedlgTitle: "",
            updatedlgType: 0
        }
    }

    newUser() {
        this.setState({
            newuser: !this.state.newuser,
            userdlgTitle: txtPIU.newuserdiv[this.lang],
            userdlgButton: txtPIU.newuserbtn[this.lang]
        });
    }

    editUser() {
        this.setState({
            newuser: !this.state.newuser,
            userdlgTitle: txtPIU.edituserdiv[this.lang],
            userdlgButton: txtPIU.edituserbtn[this.lang]
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
            alert(txtPIU.loadwarn[this.lang]);
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
                this.state.userstat.set(cur[0], cur[1]);
        }

        this.setState({
            username: userinfo[0],
            userlv: userinfo[1],
            loaded: true
        });
    }

    saveUser() {
        let text = "";
        text += this.state.username+","+this.state.userlv+"\n";
        
        const keys = this.state.userstat.keys();
        for(let i = 0; i < this.state.userstat.size; i++) {
            const ckey = keys.next();
            if(ckey.value != "")
                text += ckey.value + ","+this.state.userstat.get(ckey.value) + "\n";
        }
        
        // 데이터를 새 파일(임시)에 쓰고 다운로드
        const elem = document.createElement("a");
        elem.setAttribute("href", "data:text/plain;charset=utf-8,"+encodeURIComponent(text));
        elem.setAttribute("download", "piudata_"+this.state.username+"_"+this.unixTimeToText(new Date().getTime())+".csv");
        elem.style.display = 'none';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }

    unixTimeToText(uxtime) {
        const now = new Date(uxtime);
        const time = now.getFullYear()
            + ((now.getMonth()+1)<10?'0':'') + (now.getMonth()+1)
            + (now.getDate()<10?'0':'') + now.getDate() + "_"
            + now.getHours()
            + (now.getMinutes()<10?'0':'') + now.getMinutes()
            + (now.getSeconds()<10?'0':'') + now.getSeconds();
        return time;
    }

    getPatterns(type, level) {
        const cat = {};
        let steptype = "";
        let steplv = "";

        // 테이블을 모두 리셋헤야함
        // 데이터는 다 저장되어 있음
        this.resetTable();

        if(type == "d" && level == "25") {
            axios.get(this.piuDataUrl+"/over/"+type)
            .then((res) => {
                this.updateTable(res.data, true);
                steptype = "Double";
                steplv = level+" Over";
                cat.catez = "25 E";
                cat.catne = "25 N";
                cat.catnr = "25 H";
                cat.catnh = level+1;
                cat.cathi = level+2;
                cat.catov = level+3;

                if(this.cntov === 0) cat.catov = "";
                if(this.cnthi === 0) cat.cathi = "";
                if(this.cntnh === 0) cat.catnh = "";
                if(this.cntnr === 0) cat.catnr = "";
                if(this.cntne === 0) cat.catne = "";
                if(this.cntez === 0) cat.catez = "";
                if(this.cntbe === 0) cat.catbe = "";
                if(this.cntrd === 0) cat.catrd = "";

                this.categoryUpdater(cat, steptype, steplv);
            });
        }
        else if(type == 's' && level == '24') {
            axios.get(this.piuDataUrl+"/over/"+type)
            .then((res) => {
                this.updateTable(res.data, true);
                steptype = "Single";
                steplv = level+" Over";
                cat.catnh = level+1;
                cat.cathi = level+2;
                cat.catov = level+3;

                if(this.cntov === 0) cat.catov = "";
                if(this.cnthi === 0) cat.cathi = "";
                if(this.cntnh === 0) cat.catnh = "";
                if(this.cntnr === 0) cat.catnr = "";
                if(this.cntne === 0) cat.catne = "";
                if(this.cntez === 0) cat.catez = "";
                if(this.cntbe === 0) cat.catbe = "";
                if(this.cntrd === 0) cat.catrd = "";

                this.categoryUpdater(cat, steptype, steplv);
            });
        }
        else {
            axios.get(this.piuDataUrl+"/"+type+"/"+level)
            .then((res) => {
                this.updateTable(res.data, false);
                if(type == "s") steptype = "Single";
                if(type == "d") steptype = "Double";
                steplv = level;
                cat.catrd = txtPIU.diff.random[this.lang];
                cat.catbe = (level*1-1)+txtPIU.diff.below[this.lang];
                cat.catez = txtPIU.diff.easy[this.lang];
                cat.catne = txtPIU.diff.ne[this.lang];
                cat.catnr = txtPIU.diff.normal[this.lang];
                cat.catnh = txtPIU.diff.nh[this.lang];
                cat.cathi = txtPIU.diff.high[this.lang];
                cat.catov = (level*1+1)+txtPIU.diff.over[this.lang];

                if(this.cntov === 0) cat.catov = "";
                if(this.cnthi === 0) cat.cathi = "";
                if(this.cntnh === 0) cat.catnh = "";
                if(this.cntnr === 0) cat.catnr = "";
                if(this.cntne === 0) cat.catne = "";
                if(this.cntez === 0) cat.catez = "";
                if(this.cntbe === 0) cat.catbe = "";
                if(this.cntrd === 0) cat.catrd = "";

                this.categoryUpdater(cat, steptype, steplv);
            });
        }
    }

    categoryUpdater(cat, steptype, steplv) {
        this.setState({
            catOV: cat.catov,
            catHD: cat.cathi,
            catNH: cat.catnh,
            catNR: cat.catnr,
            catNE: cat.catne,
            catEZ: cat.catez,
            catBE: cat.catbe,
            catRD: cat.catrd,
            steptype: steptype,
            steplv: steplv
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
        const div = document.getElementById("cs"+ptid);
        const rankval = this.state.userstat.get(ptid.toString());

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

    render() {
        const self = this;

        const chback = {
            backgroundColor: 'rgb(37, 37, 37)'
        }

        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader style={chback}>
                                <h3>Pump It Up XX</h3>
                                <p>{txtPIU.subtitle[self.lang]}</p>
                            </CardHeader>
                            <CardBody>
                                <Col xs="12" id="howto">
                                    {txtPIU.howto1[self.lang]}<br/>
                                    1. {txtPIU.howto2[self.lang]}<br/>
                                    2. <b><font color='red'>{txtPIU.howto3[self.lang]}</font></b><br/>
                                    3. {txtPIU.howto4[self.lang]}<br/>
                                    4. {txtPIU.howto5[self.lang]}<br/>
                                    5. {txtPIU.howto6[self.lang]}
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader style={chback}>
                                <h3>{txtPIU.functitle[self.lang]}</h3>
                            </CardHeader>
                            <CardBody className="text-center btn-group">
                                <Button onClick={() => self.newUser()}>
                                    {txtPIU.newuser[self.lang]}
                                </Button>

                                <Button onClick={() => self.loadUser()}>
                                    {txtPIU.load[self.lang]}
                                </Button>
                                <Button onClick={() => self.saveUser()}>
                                    {txtPIU.save[self.lang]}
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card>
                            <CardHeader id="seldiffSingletitle" style={chback}>
                                <h3>{txtPIU.single[self.lang]}</h3>
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
                            <CardHeader id="seldiffDoubletitle" style={chback}>
                                <h3>{txtPIU.double[self.lang]}</h3>
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
                            <CardHeader style={chback}>
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
                                            {txtPIU.edit[self.lang]}
                                        </Button>
                                        <Button onClick={() => self.updatePatternMultiple()}>
                                            {txtPIU.updatecheckedbtn[self.lang]}
                                        </Button>
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

                <Row style={{display: self.state.loaded ? "block" : "none"}}>
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

                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card id="targetTable">
                            <CardHeader className="text-center" style={chback}>
                                <Col xs="12">
                                    <h3>Pump It Up XX</h3>
                                    <h4><span id="type"></span> Lv.<span id="lv"></span> Clear Table</h4>
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
                
                <input id="fileopen" accept=".csv" type="file"
                    name="fileopen" style={{display:"none"}} />

                <UserDialog title={self.state.userdlgTitle}
                    curname={self.state.username}
                    curlv={self.state.userlv}
                    button={self.state.userdlgButton}
                    display={self.state.newuser}
                    handler={self.newUserHandler}
                    toggle={self.newUser} />
                <PatternUpdateDialog title={self.state.updatedlgTitle}
                    type={self.state.updatedlgType}
                    button={txtPIU.update[self.lang]}
                    handler={self.patternHandler}
                    display={self.state.pattern}
                    ptid={self.state.currentpt}
                    updateData={self.updateData}
                    updateMultipleData={self.updateMultipleData}
                    updatePatternDialog={self.updatePatternDialog} />
            </Container>
        )
    }
}

export default PIUTable;