import { useState } from "react"
import { apiSearch } from "../api/apiSearch"
import SearchItemData from "../data/ISearchItem"
import SearchItemTool from "../tools/searchItemTool"
import SearchPatternData from "../data/ISearchPattern"
import SearchQuery from "../data/searchQuery"

const useSearch = () => {
    const [keyword, setKeyword] = useState('')
    const [withRemoved, setWithRemoved] = useState(false)
    const [result, setResult] = useState(new Array<SearchItemData>());

    const checkEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') runQuery()
    }

    const runQuery = () => {
        querySearch(keyword)
    }

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

        setResult(arr)
    }

    return {setKeyword, runQuery, checkEnter, withRemoved, setWithRemoved, result}
}

export default useSearch