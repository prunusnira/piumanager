import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import txtPIU from './txtpiu';
import './piu-custom.css';
import UserDialog from './UserInfoDialog';
import PatternUpdateDialog from './PatternUpdateDialog';
import ShareDialog from './ShareDialog';
import html2canvas from 'html2canvas';
import MusicInfo from './MusicInfo'
import UserInfo from './UserInfo'

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
import Language from './language';
import CategoryList from './CategoryList';

interface Props {

}

interface State {
    // userinfo
    username: string,
    userlv: string,
    userrank1: string,
    userrank2: string,
    userstat: Map<string, string>,
    userdlgTitle: string,
    userdlgButton: string,

    // rank
    ranksss: number,
    rankss: number,
    ranks: number,
    ranka: number,
    rankao: number,
    rankbcd: number,
    rankbcdo: number,
    rankf: number,
    ranknp: number,
    all: number,

    // musictype
    musarcade: boolean,
    musshort: boolean,
    musfull: boolean,
    musremix: boolean,

    ptidlist: Array<string>,

    // screen and dialog
    loaded: boolean,
    newuser: boolean,
    changerank: boolean,
    pattern: boolean,
    showrank: boolean,
    showcheck: boolean,

    // category text
    catOV: string,
    catHI: string,
    catNH: string,
    catNR: string,
    catNE: string,
    catEZ: string,
    catBE: string,
    catRD: string,

    arrOV: Array<MusicInfo>,
    arrHI: Array<MusicInfo>,
    arrNH: Array<MusicInfo>,
    arrNR: Array<MusicInfo>,
    arrNE: Array<MusicInfo>,
    arrEZ: Array<MusicInfo>,
    arrBE: Array<MusicInfo>,
    arrRD: Array<MusicInfo>,

    // current page
    steptype: string,
    steplv: number,

    // update pt info
    updaterank: string,
    currentpt: number,
    isOver: boolean,
    updatedlgTitle: string,
    updatedlgType: number,

    // sharedlg
    shareDlgShow: boolean,
    shareDlgCont1: string,
    shareDlgCont2: string
}

class PIUTable extends Component<Props, State> {
    private langObj = new Language();
    private lang = this.langObj.getLang();
    private piuDataUrl = "https://piu.nira.one/d";
    //private piuDataUrl = "http://localhost:8081/d";

    private cntov = 0;
    private cnthi = 0;
    private cntnh = 0;
    private cntnr = 0;
    private cntne = 0;
    private cntez = 0;
    private cntbe = 0;
    private cntrd = 0;

    constructor(props: Props) {
        super(props);

        this.newUserHandler = this.newUserHandler.bind(this);
        this.newUser = this.newUser.bind(this);
        this.updatePatternDialog = this.updatePatternDialog.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateMultipleData = this.updateMultipleData.bind(this);
        this.rankreset = this.rankreset.bind(this);
        this.updateRankData = this.updateRankData.bind(this);
        this.shareDlgClose = this.shareDlgClose.bind(this);
        this.callbackOpen = this.callbackOpen.bind(this);
        (window as any).callbackOpen = this.callbackOpen;

        this.state = {
            // userinfo
            username: "",
            userlv: "",
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
            loaded: false,
            newuser: false,
            changerank: false,
            pattern: false,
            showrank: true,
            showcheck: true,

            // category text
            catOV: "",
            catHI: "",
            catNH: "",
            catNR: "",
            catNE: "",
            catEZ: "",
            catBE: "",
            catRD: "",

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
            updatedlgType: 0,

            // sharedlg
            shareDlgShow: false,
            shareDlgCont1: "",
            shareDlgCont2: ""
        }
    }

    userLog(type: string) {
        axios.post(this.piuDataUrl+'/log', {
            name: this.state.username,
            type: type
        });
    }

    newUser() {
        this.setState({
            newuser: !this.state.newuser,
            userdlgTitle: (txtPIU.newuserdiv as any)[this.lang],
            userdlgButton: (txtPIU.newuserbtn as any)[this.lang]
        });
    }

    editUser() {
        this.setState({
            newuser: !this.state.newuser,
            userdlgTitle: (txtPIU.edituserdiv as any)[this.lang],
            userdlgButton: (txtPIU.edituserbtn as any)[this.lang]
        });
    }

    newUserHandler(name: string, lv: string) {
        const self = this;
        this.setState({
            username: name,
            userlv: lv,
            loaded: true
        }, () => {
            self.userLog("new");
        });
    }

    loadUser() {
        // 파일 열기 대화상자를 열고 데이터를 가져옴
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert((txtPIU.loadwarn as any)[this.lang]);
        }

        const self = this;
        const fileopen = document.getElementById("fileopen");
        if(fileopen) {
            fileopen.click();
            fileopen.onchange = (e: any) => {
                self.handleFileSelect(e.target.files[0]);
                // 데이터 열기
                self.setState({
                    loaded: true
                });
            }
        }
    }

    handleFileSelect(file: File) {
        const self = this;
        const fr = new FileReader();
        fr.onload = function(e: any) {
            const result = e.target.result;
            self.callbackOpen(result);
        };
        fr.readAsText(file);
    }
    
    callbackOpen(result: string) {
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
        }, () => {
            this.userLog("load");
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

    unixTimeToText(uxtime: number, onlyday = false) {
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

    getPatterns(type: string, level: string) {
        const cat = new CategoryList();
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
                steplv = level+"+";
                cat.catez = "25 E";
                cat.catne = "25 N";
                cat.catnr = "25 H";
                cat.catnh = (parseInt(level)+1).toString();
                cat.cathi = (parseInt(level)+2).toString();
                cat.catov = (parseInt(level)+3).toString();

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
                steplv = level+"+";
                cat.catnh = (parseInt(level)).toString();
                cat.cathi = (parseInt(level)+1).toString();
                cat.catov = (parseInt(level)+2).toString();

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
                cat.catrd = (txtPIU.diff.random as any)[this.lang];
                cat.catbe = (parseInt(level)-1)+(txtPIU.diff.below as any)[this.lang];
                cat.catez = (txtPIU.diff.easy as any)[this.lang];
                cat.catne = (txtPIU.diff.ne as any)[this.lang];
                cat.catnr = (txtPIU.diff.normal as any)[this.lang];
                cat.catnh = (txtPIU.diff.nh as any)[this.lang];
                cat.cathi = (txtPIU.diff.high as any)[this.lang];
                cat.catov = (parseInt(level)+1)+(txtPIU.diff.over as any)[this.lang];

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

    categoryUpdater(cat: CategoryList, steptype: string, steplv: string) {
        this.setState({
            catOV: cat.catov,
            catHI: cat.cathi,
            catNH: cat.catnh,
            catNR: cat.catnr,
            catNE: cat.catne,
            catEZ: cat.catez,
            catBE: cat.catbe,
            catRD: cat.catrd,
            steptype: steptype,
            steplv: parseInt(steplv)
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

    updateTable(data: any, isOver: boolean) {
        const ptidlist = [];
        let all = 0;
        
        for(let i = 0; i < data.length; i++) {
            const current = data[i];
            ptidlist.push(current.ptid);
            all++;

            const obj = new MusicInfo();
    
            if(current.removed == 0) {
                obj.songtype = current.songtype;
                obj.ptid = current.ptid;
                obj.titleko = current.title_ko;
                obj.titleen = current.title_en;
                obj.musicid = current.musicid;
                obj.steptype = current.steptype;
                obj.version = current.version;
                obj.new = current.new;
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
                    this.updateData(ptid, rank!);
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
            userrank2: "A: "+st.rankao+" (Off) | "+
                    "BCD: "+st.rankbcdo+" (Off) | "+
                    "F: "+st.rankf+" | "+
                    "No Play: "+(st.all-st.ranksss-st.rankss-st.ranks-st.ranka-st.rankao-st.rankbcd-st.rankbcdo-st.rankf)
        });
    }

    updateData(ptid: number, rank: string) {
        this.state.userstat.set(ptid.toString(), rank);
        this.updateRecord(ptid);
        this.rankreset();
        this.updateRankData();

        // 창 닫기
        if(this.state.pattern) {
            this.updatePatternDialog(ptid);
        }
    }

    updateMultipleData(rank: string) {
        const checked = document.querySelectorAll("input[id=ptnsel]:checked");
        for(let i = 0; i < checked.length; i++) {
            const ptid = (checked[i] as HTMLInputElement).value;
            this.state.userstat.set(ptid, rank);
            this.updateRecord(parseInt(ptid));
        }
        this.rankreset();
        this.updateRankData();

        // 창 닫기
        if(this.state.pattern) {
            this.updatePatternDialog(0);
        }
    }

    updatePatternDialog(ptid: number) {
        this.setState({
            pattern: !this.state.pattern,
            currentpt: ptid,
            updatedlgType: 0,
            updatedlgTitle: (txtPIU.updatedivtitle as any)[this.lang]
        });
    }

    updatePatternMultiple() {
        this.setState({
            pattern: !this.state.pattern,
            updatedlgType: 1,
            updatedlgTitle: (txtPIU.updatealldiv as any)[this.lang]
        });
    }

    updateRecord(ptid: number) {
        const div = document.getElementById("cs"+ptid);
        const rankval = this.state.userstat.get(ptid.toString());

        if(rankval) {
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

            let display = "block";
            if(!this.state.showrank) display = "none"

            if(div)
                div.innerHTML = "\
                    <img style='width: 60%; position: absolute; right: 0px; top: 30px;' \
                        src='"+process.env.PUBLIC_URL+"/img/grade_"+rank+".png' />";
        }
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

    handleMusicType(type: number) {
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

    musicTypeOnOff(type: number, bid: string) {
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

    scrShot(divname: string, filename: string) {
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

    shareURL() {
        const lv = this.state.steplv;
        const type = this.state.steptype;
        const sharedata = new Map<string, Array<MusicInfo>>();
        sharedata.set("ov", this.state.arrOV);
        sharedata.set("hi", this.state.arrHI);
        sharedata.set("nh", this.state.arrNH);
        sharedata.set("nr", this.state.arrNR);
        sharedata.set("ne", this.state.arrNE);
        sharedata.set("ez", this.state.arrEZ);
        sharedata.set("be", this.state.arrBE);
        sharedata.set("rd", this.state.arrRD);
        
        const clearstatus = new Map<string, string>();
        const keys = this.state.userstat.keys();
        
        let end = false;
        while(!end) {
            const itor = keys.next();

            if(itor.value !== undefined) {
                // 1. ptid 값이 들어있는지 확인
                let has = false;

                for(let i = 0; i < this.state.arrOV.length - 1; i++) {
                    if(this.state.arrOV[i].ptid === parseInt(itor.value)) {
                        has = true;
                        break;
                    }
                }

                if(!has) {
                    for(let i = 0; i < this.state.arrHI.length - 1; i++) {
                        if(this.state.arrHI[i].ptid === parseInt(itor.value)) {
                            has = true;
                            break;
                        }
                    }
                }

                if(!has) {
                    for(let i = 0; i < this.state.arrNH.length - 1; i++) {
                        if(this.state.arrNH[i].ptid === parseInt(itor.value)) {
                            has = true;
                            break;
                        }
                    }
                }

                if(!has) {
                    for(let i = 0; i < this.state.arrNR.length - 1; i++) {
                        if(this.state.arrNR[i].ptid === parseInt(itor.value)) {
                            has = true;
                            break;
                        }
                    }
                }

                if(!has) {
                    for(let i = 0; i < this.state.arrNE.length - 1; i++) {
                        if(this.state.arrNE[i].ptid === parseInt(itor.value)) {
                            has = true;
                            break;
                        }
                    }
                }

                if(!has) {
                    for(let i = 0; i < this.state.arrEZ.length - 1; i++) {
                        if(this.state.arrEZ[i].ptid === parseInt(itor.value)) {
                            has = true;
                            break;
                        }
                    }
                }

                if(!has) {
                    for(let i = 0; i < this.state.arrBE.length - 1; i++) {
                        if(this.state.arrBE[i].ptid === parseInt(itor.value)) {
                            has = true;
                            break;
                        }
                    }
                }

                if(!has) {
                    for(let i = 0; i < this.state.arrRD.length - 1; i++) {
                        if(this.state.arrRD[i].ptid === parseInt(itor.value)) {
                            has = true;
                            break;
                        }
                    }
                }

                if(has) {
                    clearstatus.set(itor.value, this.state.userstat.get(itor.value)!);
                }
            }
            else {
                end = true;
            }
        }

        const obj = new UserInfo();
        obj.username = this.state.username;
        obj.userlv = this.state.userlv;
        obj.lv = lv;
        obj.type = type;
        obj.lvdata = sharedata;
        obj.stat = clearstatus;

        const json = JSON.stringify(obj);

        axios.post('/d/save/'+this.state.username+"/"+
                    this.state.steptype+"/"+this.state.steplv+"/"+
                    this.unixTimeToText(new Date().getTime(), true),
                    {
                        json: json
                    })
            .then((res) => {
                let message1 = "";
                let message2 = "";
                console.log(res.data);
                const json = res.data;
                if(json.status !== "error") {
                    message1 = (txtPIU.sharedlg.cont as any)[this.lang];
                    message2 = "https://piu.nira.one/"+json.msg;
                }
                else {
                    message1 = (txtPIU.sharedlg.error as any)[this.lang];
                    message2 = json.msg;
                }

                this.setState({
                    shareDlgCont1: message1,
                    shareDlgCont2: message2,
                    shareDlgShow: true
                })
            });
    }

    shareDlgClose() {
        this.setState({
            shareDlgShow: false
        });
    }
    
    langChange(type: string): void {
        document.cookie = "lang="+type+"; path=/";
        window.location.reload();
    }

    render() {
        const self = this;

        const chback = {
            backgroundColor: 'rgb(37, 37, 37)'
        }

        return (
            <Container fluid>
                {/*<Alert onClose={() => console.log("")}>
                    <Row>
                        <Col xs="12" className="text-center">
                            <b><span style={{color:"black"}}>{(txtPIU.test as any)[self.lang]}</span></b>
                        </Col>
                    </Row>
                </Alert>*/}
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader style={chback}>
                                <span style={{fontSize:"150%"}}>Pump It Up</span>
                                &nbsp;
                                <span>{(txtPIU.subtitle as any)[self.lang]}</span>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-right">
                                        Language Select:&nbsp;
                                        <Link to="#no_div" className="innerhref" onClick={() => this.langChange('ko')}>한국어</Link>&nbsp;
                                        <Link to="#no_div" className="innerhref" onClick={() => this.langChange('jp')}>日本語</Link>&nbsp;
                                        <Link to="#no_div" className="innerhref" onClick={() => this.langChange('cn')}>中文简体</Link>&nbsp;
                                        <Link to="#no_div" className="innerhref" onClick={() => this.langChange('en')}>English</Link>
                                        <br/>
                                        <b><span style={{fontSize:"80%"}}>(Unsaved data will be lost)</span></b><br/>
                                        <span style={{fontSize:"80%"}}>Simplified chinese translation by ZM-J</span>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col xs="12" id="howto">
                                        {(txtPIU.howto1 as any)[self.lang]}<br/>
                                        1. {(txtPIU.howto2 as any)[self.lang]}<br/>
                                        2. {(txtPIU.howto3 as any)[self.lang]}<br/>
                                        3. {(txtPIU.howto4 as any)[self.lang]}<br/>
                                        4. {(txtPIU.howto5 as any)[self.lang]}
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
                                <h4>{(txtPIU.functitle as any)[self.lang]}</h4>
                            </CardHeader>
                            <CardBody className="text-center btn-group">
                                <Button color="secondary" outline onClick={() => self.newUser()}>
                                    {(txtPIU.newuser as any)[self.lang]}
                                </Button>

                                <Button color="secondary" outline onClick={() => self.loadUser()}>
                                    {(txtPIU.load as any)[self.lang]}
                                </Button>
                                <Button color="secondary" outline onClick={() => self.saveUser()}>
                                    {(txtPIU.save as any)[self.lang]}
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card>
                            <CardHeader id="seldiffSingletitle" style={chback}>
                                <h3>{(txtPIU.patternsel as any)[self.lang]}</h3>
                            </CardHeader>
                            <CardBody className="text-center" id="seldiffSingle">
                                <Row>
                                    <Col xs="6" className="text-center">
                                        SINGLE<br/>
                                        <select className="form-control"
                                            onChange={(e) => self.getPatterns('s', e.target.value)}>
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
                                            onChange={(e) => self.getPatterns('d', e.target.value)}>
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row style={{display: self.state.loaded ? "block" : "none"}}>
                    <Col xs="12">
                        <Card id="userinfo">
                            <CardHeader style={chback}>
                                <h4>{(txtPIU.menu as any)[this.lang]}</h4>
                            </CardHeader>
                            <CardBody>
                                <Row className="text-center">
                                    <Col xs="12" className="text-center btn-group">
                                        <Button color="secondary" outline style={{width:"50%"}} onClick={() => self.editUser()}>
                                            {(txtPIU.edit as any)[self.lang]}
                                        </Button>
                                        <Button color="secondary" outline style={{width:"50%"}} onClick={() => self.updatePatternMultiple()}>
                                            {(txtPIU.updatecheckedbtn as any)[self.lang]}
                                        </Button>
                                    </Col>
                                    <Col xs="12" className="text-center btn-group">
                                        <Button color="secondary" outline style={{width:"50%"}} onClick={() => self.hideCheckbox()}>
                                            {(txtPIU.hidechkbox as any)[self.lang]}
                                        </Button>
                                        <Button color="secondary" outline style={{width:"50%"}} onClick={() => self.hideRank()}>
                                            {(txtPIU.hiderank as any)[self.lang]}
                                        </Button>
                                    </Col>
                                    <Col xs="12" className="text-center btn-group">
                                        <Button color="secondary" outline style={{width:"50%"}} onClick={() => self.scrShot('targetTable', "piu_"+self.state.username+"_"+self.state.steptype+"_"+self.state.steplv+"_"+this.unixTimeToText(new Date().getTime())+".jpg")}>
                                            {(txtPIU.scrbtn as any)[this.lang]}
                                        </Button>
                                        <Button color="secondary" outline style={{width:"50%"}} onClick={() => self.shareURL()}>
                                            {(txtPIU.urlshare as any)[this.lang]}
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <h5>{(txtPIU.songtype as any)[self.lang]}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" className="text-center">
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
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row
                    style={{display: self.state.loaded ? "block" : "none"}}
                    id="targetTable">
                    <Col xs="12">
                        <Card>
                            <CardHeader style={chback}>
                                <Col xs="12">
                                    <h4>Pump It Up XX</h4>
                                    <h5>{self.state.steptype} Lv.{self.state.steplv} Clear Table</h5>
                                </Col>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="4"
                                        style={{backgroundColor:""}}>
                                        <b><span style={{fontSize: "80%"}}>PLAYER NAME</span></b> {self.state.username}<br/>
                                        <b><span style={{fontSize: "80%"}}>PLAYER LEVEL</span></b> {self.state.userlv}
                                    </Col>
                                    <Col xs="8" style={{fontSize: "80%"}} className="text-center">
                                        {self.state.userrank1}<br/>
                                        {self.state.userrank2}
                                    </Col>
                                </Row>
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
                                                    updatePatternDialog={self.updatePatternDialog} />
                                        </Row>
                                    </Col>
                                </Row>
                            
                                <Row className="div-lineadd" id="divHigh"
                                    style={{backgroundColor: "#ffa9b0"}}>
                                    <Col xs="12">
                                        <Row>
                                            <Col xs="12" className="piu-left" id="catHigh">
                                                {self.state.catHI}
                                            </Col>
                                        </Row>
                                        <Row id="lvHigh">
                                            <PIUTableObj list={self.state.arrHI}
                                                    key="hi"
                                                    lang={self.lang}
                                                    showrank={self.state.showrank}
                                                    showcheck={self.state.showcheck}
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
                    button={(txtPIU.update as any)[self.lang]}
                    display={self.state.pattern}
                    ptid={self.state.currentpt}
                    updateData={self.updateData}
                    updateMultipleData={self.updateMultipleData}
                    updatePatternDialog={self.updatePatternDialog} />
                <ShareDialog display={self.state.shareDlgShow}
                    content1={self.state.shareDlgCont1}
                    content2={self.state.shareDlgCont2}
                    close={self.shareDlgClose} />
            </Container>
        )
    }
}

export default PIUTable;