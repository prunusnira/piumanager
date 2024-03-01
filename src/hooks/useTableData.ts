import {apiGetPatternData} from "../api/apiTable"
import {IMusic} from "../data/IMusic"
import TxtTableMenuKo from "../text/table/tablemenu/txtTablemenu-ko"
import TxtTableMenuJp from "../text/table/tablemenu/txtTablemenu-jp"
import TxtTableMenuCn from "../text/table/tablemenu/txtTablemenu-cn"
import TxtTableMenuEn from "../text/table/tablemenu/txtTablemenu-en"
import {RankType} from "../data/rankType"
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {atomLanguage} from "../recoil/language";
import {atomStatus} from "../recoil/status";
import { atomTable } from "../recoil/table";
import {atomUser} from "../recoil/user";

const useTableData = () => {
    const language = useRecoilValue(atomLanguage);
    const [status, setStatus] = useRecoilState(atomStatus);
    const setTable = useSetRecoilState(atomTable);
    // const setTableOver = useSetRecoilState(atomTableOver);
    // const setTableHigh = useSetRecoilState(atomTableHigh);
    // const setTableNH = useSetRecoilState(atomTableNH);
    // const setTableNormal = useSetRecoilState(atomTableNormal);
    // const setTableNE = useSetRecoilState(atomTableNE);
    // const setTableEasy = useSetRecoilState(atomTableEasy);
    // const setTableBelow = useSetRecoilState(atomTableBelow);
    // const setTableRandom = useSetRecoilState(atomTableRandom);
    // const setTableTitle = useSetRecoilState(atomTableTitle);
    const user = useRecoilValue(atomUser);

    const TxtTableMenu =
        language === 'ko' ? TxtTableMenuKo :
            language === 'jp' ? TxtTableMenuJp :
                language === 'cn' ? TxtTableMenuCn : TxtTableMenuEn

    const getPatterns = async () => {
        // 테이블 리셋
        setTable([]);
        // setTableOver([])
        // setTableHigh([])
        // setTableNH([])
        // setTableNormal([])
        // setTableNE([])
        // setTableEasy([])
        // setTableBelow([])
        // setTableRandom([])

        const tableData = await apiGetPatternData(status.patternType, status.patternLv);
        if(tableData) {
            updateTable(tableData, true);
        }

        // 데이터는 다 저장되어 있음
        // if (status.patternType === PatternType.DOUBLE &&
        //     status.patternLv === 25) {
        //     apiGetPatternData(status.patternType, status.patternLv)
        //         .then((data) => {
        //             updateTable(data as Array<IMusic>, true)
        //             setTableTitle({
        //                 over: '28',
        //                 high: '27',
        //                 normalhigh: '26',
        //                 normal: '25H',
        //                 normaleasy: '25N',
        //                 easy: '25E',
        //                 below: '',
        //                 random: '',
        //             })
        //         })
        // } else if (status.patternType === PatternType.SINGLE &&
        //     status.patternLv === 24) {
        //     apiGetPatternData(status.patternType, status.patternLv)
        //         .then((data) => {
        //             updateTable(data as Array<IMusic>, true)
        //             setTableTitle({
        //                 over: '26',
        //                 high: '25',
        //                 normalhigh: '24',
        //                 normal: '',
        //                 normaleasy: '',
        //                 easy: '',
        //                 below: '',
        //                 random: '',
        //             })
        //         })
        // } else if (status.patternType === PatternType.COOP) {
        //     apiGetPatternData(status.patternType, status.patternLv)
        //         .then((data) => {
        //             updateTable(data as Array<IMusic>, false)
        //             if (status.patternLv === 2) {
        //                 setTableTitle({
        //                     over: 'CO-OP x2 VH',
        //                     high: 'CO-OP x2 HD',
        //                     normalhigh: 'CO-OP x2 NH',
        //                     normal: 'CO-OP x2 NR',
        //                     normaleasy: 'CO-OP x2 NE',
        //                     easy: 'CO-OP x2 EZ',
        //                     below: 'CO-OP x2 VE',
        //                     random: 'CO-OP x2 Turn',
        //                 })
        //             } else {
        //                 setTableTitle({
        //                     over: '',
        //                     high: '',
        //                     normalhigh: '',
        //                     normal: `CO-OP x${status.patternLv}`,
        //                     normaleasy: '',
        //                     easy: '',
        //                     below: '',
        //                     random: '',
        //                 })
        //             }
        //         })
        // } else {
        //     apiGetPatternData(status.patternType, status.patternLv)
        //         .then((data) => {
        //             updateTable(data as Array<IMusic>, false)
        //             setTableTitle({
        //                 over: `${status.patternLv + 1}${TxtTableMenu.diff.over}`,
        //                 high: TxtTableMenu.diff.high,
        //                 normalhigh: TxtTableMenu.diff.nh,
        //                 normal: TxtTableMenu.diff.normal,
        //                 normaleasy: TxtTableMenu.diff.ne,
        //                 easy: TxtTableMenu.diff.easy,
        //                 below: `${status.patternLv - 1}${TxtTableMenu.diff.below}`,
        //                 random: TxtTableMenu.diff.random,
        //             })
        //         });
        // }
    }

    const updateTable = (data: Array<IMusic>, isOver: boolean) => {
        // const musicList = {
        //     over: new Array<IMusic>(),
        //     high: new Array<IMusic>(),
        //     normalhigh: new Array<IMusic>(),
        //     normal: new Array<IMusic>(),
        //     normaleasy: new Array<IMusic>(),
        //     easy: new Array<IMusic>(),
        //     below: new Array<IMusic>(),
        //     random: new Array<IMusic>(),
        // }
        const musicList: IMusic[] = [];

        const ptidlist: number[] = []

        const size = data.length

        data.forEach(current => {
            ptidlist.push(current.ptid)

            let obj: IMusic = {
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
                rank: RankType.NP,
                removedPattern: 0,
                breakOff: false,
            }

            if (current.removed === 0) {
                obj.ptid = current.ptid
                obj.musicid = current.musicid
                obj.title_en = current.title_en
                obj.title_ko = current.title_ko
                obj.sdtype = current.sdtype
                obj.songtype = current.songtype
                obj.steptype = current.steptype
                obj.version = current.version
                obj.newpattern = current.newpattern
                obj.rank = RankType.NP
                obj.removedPattern = current.removedPattern

                musicList.push(obj);
                // if (isOver) {
                //     if (current.sdtype === 0) {
                //         switch (current.lv) {
                //             case 24:
                //                 musicList.normalhigh.push(obj)
                //                 break
                //             case 25:
                //                 musicList.high.push(obj)
                //                 break
                //             case 26:
                //                 musicList.over.push(obj)
                //                 break
                //         }
                //     }
                //     if (current.sdtype === 1) {
                //         switch (current.lv) {
                //             case 25:
                //                 if (current.difficulty === 1) {
                //                     musicList.easy.push(obj)
                //                 }
                //                 if (current.difficulty === 2) {
                //                     musicList.normaleasy.push(obj)
                //                 }
                //                 if (current.difficulty === 3) {
                //                     musicList.normal.push(obj)
                //                 }
                //                 break;
                //             case 26:
                //                 musicList.normalhigh.push(obj)
                //                 break
                //             case 27:
                //                 musicList.high.push(obj)
                //                 break
                //             case 28:
                //                 musicList.over.push(obj)
                //                 break
                //         }
                //     }
                // } else {
                //     if (user.userPattern.has(current.ptid)) {
                //         obj.rank = user.userPattern.get(current.ptid)!.rank;
                //         obj.breakOff = user.userPattern.get(current.ptid)!.breakOff;
                //     }
                //
                //     switch (current.difficulty) {
                //         case 0:
                //             musicList.below.push(obj)
                //             break
                //         case 1:
                //             musicList.easy.push(obj)
                //             break
                //         case 2:
                //             musicList.normaleasy.push(obj)
                //             break
                //         case 3:
                //             musicList.normal.push(obj)
                //             break
                //         case 4:
                //             musicList.normalhigh.push(obj)
                //             break
                //         case 5:
                //             musicList.high.push(obj)
                //             break
                //         case 6:
                //             musicList.over.push(obj)
                //             break
                //         case 7:
                //             musicList.random.push(obj)
                //             break
                //     }
                // }
            }
        });

        setTable(musicList);
        // setTableOver(musicList.over)
        // setTableHigh(musicList.high)
        // setTableNH(musicList.normalhigh)
        // setTableNormal(musicList.normal)
        // setTableNE(musicList.normaleasy)
        // setTableEasy(musicList.easy)
        // setTableBelow(musicList.below)
        // setTableRandom(musicList.random)

        setStatus({
            ...status,
            ptIdList: ptidlist
        });
    }

    return {
        getPatterns
    }
}

export default useTableData