import React, { useState } from "react";
import { CardBody } from "reactstrap";
import PatternUpdateDialog from "../piutable/patternUpdateDialog";
import PIUTable from "../piutable/piutable";
import ShareDialog from "../piutable/shareDialog";
import UserDialog from "../piutable/userInfoDialog";
import { MusicData } from "./data/musicdataType";
import FileMenu from "./filemenu/filemenu";
import TableMenu from "./tablemenu/tablemenu";

const TableContainer: React.FC<{lang: string}> = ({lang}) => {
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

    // 테이블 표시 유무 정보
    const [showTable, setShowTable] = useState(false);

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

    // 테이블 상단에 랭크 개수 표시
    const [rankTxt1, setRankTxt1] = useState('');
    const [rankTxt2, setRankTxt2] = useState('');

    // 선택된 곡 제목(단일)/패턴아이디
    const [musicSelectedName, setMusicSelectedName] = useState(''); // 단일 선택시 곡 제목 설정
    const [musicSelectedIds, setMusicSelectedIds] = useState(new Array<number>());

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

    return (
        <CardBody>
            <FileMenu
                lang={lang}
                setShowUserDlg={setShowUserDlg}
                setDlgTitle={setDlgTitle}
                setDlgBtn={setDlgBtn}
                setLoaded={setLoaded}
                userName={userName}
                setUserName={setUserName}
                userLv={userLv}
                setUserLv={setUserLv}
                userStatus={userStatus}
                setUserStatus={setUserStatus} />
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
                
                rankCountReset={rankCountReset}
                
                setSSSCount={setSSSCount}
                setSSCount={setSSCount}
                setSCount={setSCount}
                setAOnCount={setAOnCount}
                setAOffCount={setAOffCount}
                setBCDOnCount={setBCDOnCount}
                setBCDOffCount={setBCDOffCount}
                setFCount={setFCount}
                setNPCount={setNPCount}
                
                showTable={showTable}
                showUpdateDlg={showUpdateDlg}

                setShowTable={setShowTable}
                setShowUpdateDlg={setShowUpdateDlg}
                setUpdateDlgTitle={setUpdateDlgTitle}
                setMultipleUpdate={setMultipleUpdate}
                
                setRankTxt1={setRankTxt1}
                setRankTxt2={setRankTxt2}
                
                musicSelectedIds={musicSelectedIds}
                setMusicSelectedName={setMusicSelectedName}
                setMusicSelectedIds={setMusicSelectedIds}
                
                showTableRank={showTableRank}
                showTableCheck={showTableCheck}
                setShowTableRank={setShowTableRank}
                setShowTableCheck={setShowTableCheck} />
            <PIUTable />

            <input id="fileopen" accept=".csv" type="file"
                    name="fileopen" style={{display:"none"}} />

            <UserDialog
                title={userDlgTitle}
                curname={userName}
                curlv={userLv}
                button={userDlgBtn}
                display={showUserDlg}
                setUserName={setUserName}
                setUserLv={setUserLv}
                setLoaded={setLoaded}
                toggle={self.newUser} />
            <PatternUpdateDialog
                title={self.state.updatedlgTitle}
                type={self.state.updatedlgType}
                button={(txtPIU.update as any)[self.lang]}
                display={self.state.pattern}
                ptid={self.state.currentpt}
                updateData={self.updateData}
                currentUpdateTitle={self.state.currentUpdateTitle}
                updateMultipleData={self.updateMultipleData}
                updatePatternDialog={self.updatePatternDialog}
                steptype={self.state.steptype}
                steplv={self.state.steplv} />
            <ShareDialog
                display={self.state.shareDlgShow}
                content1={self.state.shareDlgCont1}
                content2={self.state.shareDlgCont2}
                close={self.shareDlgClose} />
        </CardBody>
    );
}

export default TableContainer;