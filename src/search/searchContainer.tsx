import React, { useState } from "react";
import CommonData from "../table/data/commonData";
import SearchBar from "./searchbar"
import SearchItemData from "./searchItems/searchItemData";
import SearchItemTool from "./searchItems/searchItemTool";
import SearchPatternData from "./searchItems/searchPatternData";
import SearchQuery from "./searchItems/searchQuery";
import SearchResult from "./searchResult";

interface Props {
    lang: string
}

const SearchContainer = (props: Props) => {
    const [keyword, setKeyword] = useState('');
    const [list, setList] = useState(new Array<SearchItemData>());

    const querySearch = (text: string) => {
        fetch(`${CommonData.dataUrl}search/${text}/0`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json();
        })
        .then(json => {
            listSetup(json as SearchQuery[]);
        });
    }

    const listSetup = (data: Array<SearchQuery>) => {
        const arr = Array<SearchItemData>();
        data.map(d => {
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
            });
        });

        setList(arr);
    }

    return (
        <>
            <SearchBar
                lang={props.lang}

                keyword={keyword}
                setKeyword={setKeyword}
                
                querySearch={querySearch} />
            <SearchResult
                lang={props.lang}
                list={list} />
        </>
    );
}

export default SearchContainer;