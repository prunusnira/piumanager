import React from "react"
import SearchBar from "./searchbar"
import SearchResult from "./searchResult/searchResult"
import useSearch from "./useSearch"
import useSearchBar from "./useSearchBar"

const Search = () => {
    const [list, querySearch] = useSearch()
    const [setKeyword, runQuery, checkEnter] = useSearchBar(querySearch)

    return (
        <>
            <SearchBar
                setKeyword={setKeyword}
                runQuery={runQuery}
                checkEnter={checkEnter} />
            <SearchResult
                list={list} />
        </>
    )
}

export default Search