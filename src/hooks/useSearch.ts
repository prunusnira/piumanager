import { useState } from "react"
import { apiSearch } from "../api/apiSearch"
import {ISearchItem} from "../data/ISearchItem"
import {ISearchPattern} from "../data/ISearchPattern"
import SearchQuery from "../data/searchQuery"

const useSearch = () => {
    const [keyword, setKeyword] = useState('')
    const [withRemoved, setWithRemoved] = useState(false)
    const [result, setResult] = useState(new Array<ISearchItem>());

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

    const addPattern = (arr: Array<ISearchItem>, item: ISearchItem) => {
        let found = false
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].title_en === item.title_en) {
                arr[i].patterns.push(item.patterns[0])
                found = true
                break
            }
        }
        if(!found) arr.push(item)
    }

    const listSetup = (data: Array<SearchQuery>) => {
        const arr = Array<ISearchItem>()
        data.forEach(d => {
            // 곡 데이터가 있는지 확인하고 추가
            const ptdata: ISearchPattern = {
                musicid: d.musicid,
                sdtype: d.sdtype,
                steptype: d.steptype,
                lv: d.lv
            }

            addPattern(arr, {
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