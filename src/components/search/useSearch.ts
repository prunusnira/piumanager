import { useState } from "react"
import { apiSearch } from "../../api/apiSearch"
import SearchItemData from "./searchItems/searchItemData"
import SearchItemTool from "./searchItems/searchItemTool"
import SearchPatternData from "./searchItems/searchPatternData"
import SearchQuery from "./searchItems/searchQuery"

type SearchReturn = [
    SearchItemData[], (t: string) => void
]

const useSearch = (): SearchReturn => {
    const [list, setList] = useState(new Array<SearchItemData>());

    const querySearch = (text: string) => {
        apiSearch(text)
        .then(data =>
            listSetup(data as SearchQuery[])
        )
    }

    const listSetup = (data: Array<SearchQuery>) => {
        const arr = Array<SearchItemData>()
        data.forEach(d => {
            // 곡 데이터가 있는지 확인하고 추가
            const ptdata: SearchPatternData = {
                musicid: d.musicid,
                sdtype: d.sdtype,
                steptype: d.steptype,
                lv: d.lv
            }

            SearchItemTool.addPattern(arr, {
                musicid: d.musicid,
                title_en: d.title_en,
                title_ko: d.title_ko,
                patterns: [ptdata]
            })
        })

        setList(arr)
    }

    return [list, querySearch]
}

export default useSearch