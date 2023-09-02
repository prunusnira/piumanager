import React from "react"
import SearchBar from "../../components/search/searchbar"
import SearchResult from "../../components/search/searchResult/searchResult"
import useSearch from "../../hooks/useSearch"

const PageSearch = () => {
    const {
        setKeyword,
        runQuery,
        checkEnter,
        withRemoved,
        setWithRemoved,
        result,
    } = useSearch()

    return (
        <>
            <SearchBar
                setKeyword={setKeyword}
                runQuery={runQuery}
                checkEnter={checkEnter}
                withRemoved={withRemoved}
                setWithRemoved={setWithRemoved}
            />
            <SearchResult
                list={result} />
        </>
    )
}

export default PageSearch