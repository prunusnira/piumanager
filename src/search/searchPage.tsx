import React, { useState } from "react";
import SearchBar from "./searchbar"
import SearchItemData from "./searchItems/searchItemData";
import SearchResult from "./searchResult";

interface Props {
    lang: string
}

const SearchPage = (props: Props) => {
    const [list, setList] = useState(new Array<SearchItemData>())
    return (
        <>
            <SearchBar
                lang={props.lang} />
            <SearchResult
                lang={props.lang}
                list={list} />
        </>
    );
}

export default SearchPage;