import { apiGetPatternData } from "../../api/apiTable"
import { MusicData } from "./data/musicData"
import { PatternType } from "./data/patternType"
import IntegratedStore from "../../mobx/integratedStore"

import TxtTableMenuKo from "../../text/table/tablemenu/txtTablemenu-ko"
import TxtTableMenuJp from "../../text/table/tablemenu/txtTablemenu-jp"
import TxtTableMenuCn from "../../text/table/tablemenu/txtTablemenu-cn"
import TxtTableMenuEn from "../../text/table/tablemenu/txtTablemenu-en"
import { RankType } from "./data/rankType"

type TableDataReturn = [
    () => void,
    () => void,
]

const useTableData = (): TableDataReturn => {
    const {language, status, table, user} = IntegratedStore

    const TxtTableMenu =
        language.language === 'ko' ? TxtTableMenuKo :
        language.language === 'jp' ? TxtTableMenuJp :
        language.language === 'cn' ? TxtTableMenuCn : TxtTableMenuEn
            
    const getPatterns = () => {
        // 테이블을 모두 리셋헤야함
        // 데이터는 다 저장되어 있음
        resetTable()

        if(status.status.patternType === PatternType.DOUBLE &&
            status.status.patternLv === 25) {
            apiGetPatternData(status.status.patternType, status.status.patternLv)
            .then((data) => {
                updateTable(data as Array<MusicData>, true)
                table.table.random.title = ''
                table.table.below.title = ''
                table.table.easy.title = '25 E'
                table.table.normaleasy.title = '25 N'
                table.table.normal.title = '25 H'
                table.table.normalhigh.title = '26'
                table.table.high.title = '27'
                table.table.over.title = '28'
            })
        }
        else if(status.status.patternType === PatternType.SINGLE &&
            status.status.patternLv === 24) {
            apiGetPatternData(status.status.patternType, status.status.patternLv)
            .then((data) => {
                updateTable(data as Array<MusicData>, true)
                table.table.random.title = ''
                table.table.below.title = ''
                table.table.easy.title = ''
                table.table.normaleasy.title = ''
                table.table.normal.title = ''
                table.table.normalhigh.title = '24'
                table.table.high.title = '25'
                table.table.over.title = '26'
            })
        }
        else if(status.status.patternType === PatternType.COOP) {
            apiGetPatternData(status.status.patternType, status.status.patternLv)
            .then((data) => {
                updateTable(data as Array<MusicData>, false)
                if(status.status.patternLv === 2) {
                    table.table.random.title = 'CO-OP x2 Turn'
                    table.table.below.title = 'CO-OP x2 VE'
                    table.table.easy.title = 'CO-OP x2 EZ'
                    table.table.normaleasy.title = 'CO-OP x2 NE'
                    table.table.normal.title = `CO-OP x2 NR`
                    table.table.normalhigh.title = 'CO-OP x2 NH'
                    table.table.high.title = 'CO-OP x2 HD'
                    table.table.over.title = 'CO-OP x2 VH'
                }
                else {
                    table.table.random.title = ''
                    table.table.below.title = ''
                    table.table.easy.title = ''
                    table.table.normaleasy.title = ''
                    table.table.normal.title = `CO-OP x${status.status.patternLv}`
                    table.table.normalhigh.title = ''
                    table.table.high.title = ''
                    table.table.over.title = ''
                }
            })
        }
        else {
            apiGetPatternData(status.status.patternType, status.status.patternLv)
            .then((data) => {
                updateTable(data as Array<MusicData>, false)
                table.table.random.title = TxtTableMenu.diff.random
                table.table.below.title = `${status.status.patternLv-1}${TxtTableMenu.diff.below}`
                table.table.easy.title = TxtTableMenu.diff.easy
                table.table.normaleasy.title = TxtTableMenu.diff.ne
                table.table.normal.title = TxtTableMenu.diff.normal
                table.table.normalhigh.title = TxtTableMenu.diff.nh
                table.table.high.title = TxtTableMenu.diff.high
                table.table.over.title = `${status.status.patternLv+1}${TxtTableMenu.diff.over}`
            });
        }
    }

    const resetTable = () => {
        table.table.over.data = []
        table.table.high.data = []
        table.table.normalhigh.data = []
        table.table.normal.data = []
        table.table.normaleasy.data = []
        table.table.easy.data = []
        table.table.below.data = []
        table.table.random.data = []
    }

    const updateTable = (data: Array<MusicData>, isOver: boolean) => {
        const ptidlist = []

        const size = data.length
        
        for(let i = 0; i < size; i++) {
            const current = data[i]
            ptidlist.push(current.ptid)

            let obj: MusicData = {
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
            }
    
            if(current.removed === 0) {
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

                if(isOver) {
                    if(current.sdtype === 0) {
                        switch(current.lv) {
                        case 24:
                            table.table.normalhigh.data.push(obj)
                            break
                        case 25:
                            table.table.high.data.push(obj)
                            break
                        case 26:
                            table.table.over.data.push(obj)
                            break
                        }
                    }
                    if(current.sdtype === 1) {
                        switch(current.lv) {
                        case 25:
                            if(current.difficulty === 1) {
                                table.table.easy.data.push(obj)
                            }
                            if(current.difficulty === 2) {
                                table.table.normaleasy.data.push(obj)
                            }
                            if(current.difficulty === 3) {
                                table.table.normal.data.push(obj)
                            }
                            break;
                        case 26:
                            table.table.normalhigh.data.push(obj)
                            break
                        case 27:
                            table.table.high.data.push(obj)
                            break
                        case 28:
                            table.table.over.data.push(obj)
                            break
                        }
                    }
                }
                else {
                    if(user.user.userStatus.has(current.ptid)) {
                        obj.rank = user.user.userStatus.get(current.ptid)!
                    }
                    
                    switch(current.difficulty) {
                    case 0:
                        table.table.below.data.push(obj)
                        break
                    case 1:
                        table.table.easy.data.push(obj)
                        break
                    case 2:
                        table.table.normaleasy.data.push(obj)
                        break
                    case 3:
                        table.table.normal.data.push(obj)
                        break
                    case 4:
                        table.table.normalhigh.data.push(obj)
                        break
                    case 5:
                        table.table.high.data.push(obj)
                        break
                    case 6:
                        table.table.over.data.push(obj)
                        break
                    case 7:
                        table.table.random.data.push(obj)
                        break
                    }
                }
            }
        }

        status.status.ptIdList = ptidlist
    }

    return [
        getPatterns,
        resetTable,
    ]
}

export default useTableData