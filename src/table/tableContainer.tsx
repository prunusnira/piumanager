import React, { useEffect, useRef, useState } from "react";
import { CardBody } from "reactstrap";
import axios from 'axios';
import ShareDialog from "./shareDialog/shareDialog";
import UserDialog from "./userDialog/userDialog";
import { MusicData } from "./data/musicdataType";
import FileMenu from "./filemenu/filemenu";
import TableWrapper from "./tableinner/tableWrapper";
import TableMenu from "./tablemenu/tablemenu";
import TxtTable from "./txtTable";
import PatternUpdateDialog from "./patternDialog/patternUpdateDialog";
import { useParams } from "react-router-dom";
import CommonData from "./data/commonData";
import UserResetModal from "../userResetModal/userResteModal";
import SaveBeforeLoadDlg from "../saveBeforeLoadDlg/saveBeforeLoadDlg";

interface MatchProps {
    savedId: string;
}

const TableContainer: React.FC<{lang: string}> = ({lang}) => {
    // URL Parameter
    const {savedId} = useParams<MatchProps>();

    //#region State

    // 사용자 초기화 다이얼로그
    const [showUserResetDlg, setShowUserResetDlg] = useState(false)
    const [resetType, setResetType] = useState(0)   // 1: 새유저, 2: 로드
    const [allowUserLoad, setAllowUserLoad] = useState(false)
    const [allowUserSave, setAllowUserSave] = useState(false)

    // 로드되지 않은 상태로 저장을 수행했다는 알림 다이얼로그
    const [showSaveBeforeLoadDlg, setShowSaveBeforeLoadDlg] = useState(false)

    // 사용자 프로필 다이얼로그
    const [showUserDlg, setShowUserDlg] = useState(false);      // 오픈 여부 변경
    const [userDlgTitle, setDlgTitle] = useState('');   // 다이얼로그 타이틀
    const [userDlgBtn, setDlgBtn] = useState('');       // 다이얼로그 버튼 텍스트

    // 사용자 로드 여부
    const [isLoaded, setLoaded] = useState(false);

    // 사용자 정보
    const [userName, setUserName] = useState('');
    const [userLv, setUserLv] = useState(0);
    const [userStatus, setUserStatus] = useState(new Map<number, string>());

    // 테이블에 표시할 정보
    // 각 난이도별 데이터 배열
    const [arrOver, setArrOver] = useState(new Array<MusicData>());
    const [arrHigh, setArrHigh] = useState(new Array<MusicData>());
    const [arrNh, setArrNh] = useState(new Array<MusicData>());
    const [arrNormal, setArrNormal] = useState(new Array<MusicData>());
    const [arrNe, setArrNe] = useState(new Array<MusicData>());
    const [arrEasy, setArrEasy] = useState(new Array<MusicData>());
    const [arrBelow, setArrBelow] = useState(new Array<MusicData>());
    const [arrRandom, setArrRandom] = useState(new Array<MusicData>());

    // 난이도별 표시 이름
    const [txtOver, setTxtOver] = useState('');
    const [txtHigh, setTxtHigh] = useState('');
    const [txtNh, setTxtNh] = useState('');
    const [txtNormal, setTxtNormal] = useState('');
    const [txtNe, setTxtNe] = useState('');
    const [txtEasy, setTxtEasy] = useState('');
    const [txtBelow, setTxtBelow] = useState('');
    const [txtRandom, setTxtRandom] = useState('');

    // 카테고리별 표시 유무
    const [showArcade, setShowAC] = useState(true);
    const [showShort, setShowSH] = useState(true);
    const [showFull, setShowFU] = useState(true);
    const [showRemix, setShowRM] = useState(true);

    // 전체 패턴 리스트
    const [ptIdList, setPtIdList] = useState(new Array<number>());

    // 선택한 난이도 정보
    const [selDiffLv, setDiffLv] = useState(0);
    const [selSDType, setSDType] = useState('');

    // 데이터 갱신 타입
    const [isMultipleUpdate, setMultipleUpdate] = useState(false);

    // 데이터 갱신 다이얼로그
    const [showUpdateDlg, setShowUpdateDlg] = useState(false);
    const [updateDlgTitle, setUpdateDlgTitle] = useState('');

    // 랭크 카운트
    const [sssCount, setSSSCount] = useState(0);
    const [ssCount, setSSCount] = useState(0);
    const [sCount, setSCount] = useState(0);
    const [aOnCount, setAOnCount] = useState(0);
    const [aOffCount, setAOffCount] = useState(0);
    const [bcdOnCount, setBCDOnCount] = useState(0);
    const [bcdOffCount, setBCDOffCount] = useState(0);
    const [fCount, setFCount] = useState(0);
    const [npCount, setNPCount] = useState(0);

    // 테이블 항목 표시 설정
    const [showTableRank, setShowTableRank] = useState(true);
    const [showTableCheck, setShowTableCheck] = useState(false);

    // 선택된 곡 제목(단일)/패턴아이디
    const [musicSelectedName, setMusicSelectedName] = useState(''); // 단일 선택시 곡 제목 설정
    const [musicSelectedId, setMusicSelectedId] = useState(0);

    // 공유 다이얼로그
    const [showShareDlg, setShowShareDlg] = useState(false);
    const [shareDlgCont1, setShareDlgCont1] = useState('');
    const [shareDlgCont2, setShareDlgCont2] = useState('');

    // 저장된 값 부른 여부 확인
    const [isSavedData, setIsSaved] = useState(false);

    // 파일열기 ref
    const fileOpenRef = useRef<HTMLInputElement>(null)

    //#endregion

    // 최초 실행 시 실행되는 effect, constructor 대신에 처리
    useEffect(() => {
        if(savedId !== undefined) {
            // DB에 공유용으로 저장된 값을 불러와서 데이터 표시
            axios.get(`${CommonData.dataUrl}saved/${savedId}/0`)
            .then(d => {
                setIsSaved(true);
                userDataAnalyze(atob(d.data[0].saved), "saved");
            });
        }
    }, []);

    // 사용자 초기화 관련
    // 새 유저 만들기 전에 검사
    const checkUserBeforeNew = () => {
        // 이미 사용자가 로드 된 상태이면 Modal을 띄우고 새 유저를 작성할지 결정
        if(isLoaded) {
            setResetType(1)
            setShowUserResetDlg(true)
        }
        else {
            newUser()
        }
    }

    // 유저 불러오기 전에 검사
    const checkUserBeforeLoad = () => {
        // 이미 사용자가 로드 된 상태이면 Modal을 띄우고 새 유저를 작성할지 결정
        
        console.log('allowUserLoad: '+allowUserLoad)
        if(isLoaded) {
            setResetType(2)
            setShowUserResetDlg(true)
        }
        else {
            // 불러오기
            setAllowUserLoad(true)
        }
    }

    // 저장하기 전에 검사
    const checkUserBeforeSave = () => {
        if(isLoaded) {
            setAllowUserSave(true)
        }
        else {
            setShowSaveBeforeLoadDlg(true)
        }
    }

    // 사용자 초기화 다이얼로그 닫기
    const closeUserResetDlg = () => {
        setShowUserResetDlg(false)
    }

    // 열기 전 저장 막기 다이얼로그 닫기
    const closeSaveBeforeLoadDlg = () => {
        setShowSaveBeforeLoadDlg(false)
    }

    // 사용자 초기화 실행
    const runUserReset = () => {
        setLoaded(false)
        setUserName('')
        setUserLv(0)
        setUserStatus(new Map<number, string>())
        setDiffLv(0)
        setSDType('')
        setArrOver(new Array<MusicData>())
        setArrHigh(new Array<MusicData>())
        setArrNh(new Array<MusicData>())
        setArrNormal(new Array<MusicData>())
        setArrNe(new Array<MusicData>())
        setArrEasy(new Array<MusicData>())
        setArrBelow(new Array<MusicData>())
        setArrRandom(new Array<MusicData>())

        closeUserResetDlg()
        if(resetType === 1) {
            newUser()
        }
        else if(resetType === 2) {
            setAllowUserLoad(true)
        }
    }

    // 신규 사용자 생성
    const newUser = () => {
        setShowUserDlg(true);
        setDlgTitle((TxtTable.newuserdiv as any)[lang]);
        setDlgBtn((TxtTable.newuserbtn as any)[lang]);
    }
    
    const userDataAnalyze = (result: string, type: string) => {
        const str = result.split("\n");
        
        const userinfo = str[0].split(",");
        
        for(let i = 1; i < str.length; i++) {
            const cur = str[i].split(",");
            if(cur[0] !== "") {
                setUserStatus(userStatus.set(parseInt(cur[0]), cur[1]));
            }
        }

        setUserName(userinfo[0])
        setUserLv(parseInt(userinfo[1]))
        setLoaded(true)
        userLog(userinfo[0], type)
        setAllowUserLoad(false)
        console.log('allowUserLoad: '+allowUserLoad)
    }

    const userLog = (name: string, type: string) => {
        axios.post(CommonData.dataUrl+'userlog/'+name+'/'+type);
    }

    const updateRecord = (ptid: number) => {
        const div = document.getElementById("cs"+ptid);
        const rankval = userStatus.get(ptid);

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

            if(div)
                div.innerHTML =
                    "<img style='width: 50%; position: absolute; right: 0px; top: 0px;'"+
                        "src='"+process.env.PUBLIC_URL+"/img/grade_"+rank+".png' />";
        }
    }

    const updateRankCount = () => {
        let ranksss = 0;
        let rankss = 0;
        let ranks = 0;
        let ranka = 0;
        let rankao = 0;
        let rankbcdo = 0;
        let rankf = 0;
        let rankbcd = 0;

        for(let i = 0; i < ptIdList.length; i++) {
            if(userStatus.has(ptIdList[i])) {
                switch(userStatus.get(ptIdList[i])) {
                case "0": ranksss++; break;
                case "1": rankss++; break;
                case "2": ranks++; break;
                case "3": ranka++; break;
                case "4": rankao++; break;
                case "5": rankbcdo++; break;
                case "6": rankf++; break;
                case "8": rankbcd++; break;
                }
            }
        }

        setSSSCount(ranksss);
        setSSCount(rankss);
        setSCount(ranks);
        setAOnCount(ranka);
        setAOffCount(rankao);
        setBCDOnCount(rankbcd);
        setBCDOffCount(rankbcdo);
        setFCount(rankf);
        setNPCount(ptIdList.length - ranksss - rankss - ranks - ranka - rankao
            - rankbcd - rankbcdo - rankf);
    }

    const updateData = (ptid: number, rank: string) => {
        userStatus.set(ptid, rank);
        updateRecord(ptid);

        // 창 닫기
        if(showUpdateDlg) {
            closeUpdatePatternDlg();
        }
    }
    
    const updateMultipleData = (rank: string) => {
        const checked = document.querySelectorAll("input[id=ptnsel]:checked");
        for(let i = 0; i < checked.length; i++) {
            const ptid = (checked[i] as HTMLInputElement).value;
            userStatus.set(parseInt(ptid), rank);
            updateRecord(parseInt(ptid));
        }

        // 창 닫기
        if(showUpdateDlg) {
            closeUpdatePatternDlg();
        }
    }

    // 업데이트 창 열기
    const openUpdatePatternDialog = (ptid: number, title: string) => {
        setShowUpdateDlg(true);
        setMusicSelectedName(title);
        setMultipleUpdate(false);
        setUpdateDlgTitle((TxtTable.updatedivtitle as any)[lang]);
        setMusicSelectedId(ptid);
    }

    const openUpdatePatternMultiple = () => {
        setShowUpdateDlg(true);
        setMultipleUpdate(true);
        setUpdateDlgTitle((TxtTable.updatedivtitle as any)[lang]);
    }

    // 업데이트 창 닫기
    const closeUpdatePatternDlg = () => {
        setMusicSelectedId(0);
        setShowUpdateDlg(false);
    }

    const rankCountReset = () => {
        setSSSCount(0);
        setSSCount(0);
        setSCount(0);
        setAOnCount(0);
        setAOffCount(0);
        setBCDOnCount(0);
        setBCDOffCount(0);
        setFCount(0);
        setNPCount(0);
    }

    // Share dlg
    const openShareDlg = () => {
        setShowShareDlg(true);
    }

    const closeShareDlg = () => {
        setShowShareDlg(false);
    }

    return (
        <>
            <CardBody>
                <FileMenu
                    lang={lang}
                    fileOpenRef={fileOpenRef}

                    allowUserLoad={allowUserLoad}
                    allowUserSave={allowUserSave}
                    setAllowUserLoad={setAllowUserLoad}
                    setAllowUserSave={setAllowUserSave}
                    checkUserBeforeNew={checkUserBeforeNew}
                    checkUserBeforeLoad={checkUserBeforeLoad}
                    checkUserBeforeSave={checkUserBeforeSave}
                    userDataAnalyze={userDataAnalyze}

                    setShowUserDlg={setShowUserDlg}
                    setDlgTitle={setDlgTitle}
                    setDlgBtn={setDlgBtn}
                    setLoaded={setLoaded}

                    userName={userName}
                    userLv={userLv}
                    userStatus={userStatus}
                    setUserName={setUserName}
                    setUserLv={setUserLv}
                    setUserStatus={setUserStatus}
                    
                    isSavedData={isSavedData} />
                <TableMenu
                    lang={lang}
                    isLoaded={isLoaded}
                    userStatus={userStatus}
                    
                    arrOver={arrOver}
                    arrHigh={arrHigh}
                    arrNh={arrNh}
                    arrNormal={arrNormal}
                    arrNe={arrNe}
                    arrEasy={arrEasy}
                    arrBelow={arrBelow}
                    arrRandom={arrRandom}

                    setArrOver={setArrOver}
                    setArrHigh={setArrHigh}
                    setArrNh={setArrNh}
                    setArrNormal={setArrNormal}
                    setArrNe={setArrNe}
                    setArrEasy={setArrEasy}
                    setArrBelow={setArrBelow}
                    setArrRandom={setArrRandom}
                    
                    setTxtOver={setTxtOver}
                    setTxtHigh={setTxtHigh}
                    setTxtNh={setTxtNh}
                    setTxtNormal={setTxtNormal}
                    setTxtNe={setTxtNe}
                    setTxtEasy={setTxtEasy}
                    setTxtBelow={setTxtBelow}
                    setTxtRandom={setTxtRandom}
                    
                    showArcade={showArcade}
                    setShowAC={setShowAC}
                    showShort={showShort}
                    setShowSH={setShowSH}
                    showFull={showFull}
                    setShowFU={setShowFU}
                    showRemix={showRemix}
                    setShowRM={setShowRM}
                    
                    setSDType={setSDType}
                    setDiffLv={setDiffLv}
                    
                    ptIdList={ptIdList}
                    setPtIdList={setPtIdList}

                    setUserDlg={setShowUserDlg}
                    setDlgTitle={setDlgTitle}
                    setDlgBtn={setDlgBtn}
                    
                    showTableRank={showTableRank}
                    showTableCheck={showTableCheck}
                    setShowTableRank={setShowTableRank}
                    setShowTableCheck={setShowTableCheck}
                    
                    updateData={updateData}
                    openUpdatePatternMultiple={openUpdatePatternMultiple}
                    
                    setMusicSelectedId={setMusicSelectedId}
                    rankCountReset={rankCountReset}
                    updateRankCount={updateRankCount} />
                <TableWrapper
                    lang={lang}

                    isLoaded={isLoaded}
                    sdType={selSDType}
                    level={selDiffLv}

                    userName={userName}
                    userLv={userLv}
                    userStatus={userStatus}

                    txtOver={txtOver}
                    txtHigh={txtHigh}
                    txtNh={txtNh}
                    txtNormal={txtNormal}
                    txtNe={txtNe}
                    txtEasy={txtEasy}
                    txtBelow={txtBelow}
                    txtRandom={txtRandom}
                                
                    arrOver={arrOver}
                    arrHigh={arrHigh}
                    arrNh={arrNh}
                    arrNormal={arrNormal}
                    arrNe={arrNe}
                    arrEasy={arrEasy}
                    arrBelow={arrBelow}
                    arrRandom={arrRandom}
                    
                    setShowShareDlg={setShowShareDlg}
                    setShareDlgCont1={setShareDlgCont1}
                    setShareDlgCont2={setShareDlgCont2}
                    
                    sssCount={sssCount}
                    ssCount={ssCount}
                    sCount={sCount}
                    aOnCount={aOnCount}
                    aOffCount={aOffCount}
                    bcdOnCount={bcdOnCount}
                    bcdOffCount={bcdOffCount}
                    fCount={fCount}
                    npCount={npCount}
                    
                    showTableRank={showTableRank}
                    showTableCheck={showTableCheck}

                    openUpdatePatternDlg={openUpdatePatternDialog} />
                <UserDialog
                    title={userDlgTitle}
                    curname={userName}
                    curlv={userLv}
                    button={userDlgBtn}
                    showUserDlg={showUserDlg}

                    setUserName={setUserName}
                    setUserLv={setUserLv}
                    setLoaded={setLoaded}
                    setShowUserDlg={setShowUserDlg}
                    userLog={userLog} />
                <PatternUpdateDialog
                    lang={lang}

                    display={showUpdateDlg}
                    title={updateDlgTitle}
                    type={isMultipleUpdate}

                    currentUpdateTitle={musicSelectedName}
                    sdType={selSDType}
                    level={selDiffLv}
                    ptid={musicSelectedId}

                    updateData={updateData}
                    updateMultipleData={updateMultipleData}
                    updatePatternDialog={openUpdatePatternDialog}
                    closeUpdatePatternDlg={closeUpdatePatternDlg}
                    
                    setMusicSelectedId={setMusicSelectedId}
                    rankCountReset={rankCountReset}
                    updateRankCount={updateRankCount} />
                <ShareDialog
                    lang={lang}
                    display={showShareDlg}
                    content1={shareDlgCont1}
                    content2={shareDlgCont2}
                    close={closeShareDlg} />
            </CardBody>

            <input id="fileopen" accept=".csv" type="file"
                name="fileopen" style={{display:"none"}}
                ref={fileOpenRef} />

            <UserResetModal
                lang={lang}
                showUserResetDlg={showUserResetDlg}
                closeUserResetDlg={closeUserResetDlg}
                runUserReset={runUserReset} />

            <SaveBeforeLoadDlg
                lang={lang}
                showSaveBeforeLoadDlg={showSaveBeforeLoadDlg}
                closeSaveBeforeLoadDlg={closeSaveBeforeLoadDlg} />
        </>
    );
}

export default TableContainer;