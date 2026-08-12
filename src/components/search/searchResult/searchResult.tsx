import React from "react";
import CommonData from "../../../data/commonData";
import {ISearchItem} from "../../../data/ISearchItem";
import {ISearchPattern} from "../../../data/ISearchPattern";
import SearchResultPattern from "./searchResultPattern";
import TxtSearchKo from "../../../text/search/txtSearch-ko";
import TxtSearchJp from "../../../text/search/txtSearch-jp";
import TxtSearchEn from "../../../text/search/txtSearch-en";
import TxtSearchCn from "../../../text/search/txtSearch-cn";

import {
    ResultEmpty,
    ResultTable,
    ResultJacket,
    ResultData,
    ResultTitle,
    ResultDiffData,
} from "./searchResult.style";
import {useAtomValue} from "jotai";
import {atomLanguage} from "../../../atoms/language";

interface Props {
    list: Array<ISearchItem>;
}

const SearchResult = (props: Props) => {
    const language = useAtomValue(atomLanguage);

    const TxtSearch =
        language === "ko"
            ? TxtSearchKo
            : language === "jp"
                ? TxtSearchJp
                : language === "cn"
                    ? TxtSearchCn
                    : TxtSearchEn;

    if (props.list.length === 0) {
        return <ResultEmpty>{TxtSearch.listEmpty}</ResultEmpty>;
    } else {
        const rtn = props.list.map((d) => (
            <ResultTable>
                <ResultJacket
                    alt="jacket"
                    src={`${CommonData.imgUrl}${d.musicid}.png`}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = `${import.meta.env.BASE_URL}img/empty.jpg`;
                    }}
                    style={{
                        width: "100%",
                        minWidth: "75px",
                        maxWidth: "100px",
                    }}
                />
                <ResultData>
                    <ResultTitle>
                        {(function () {
                            if (language === "ko") {
                                return d.title_ko;
                            } else {
                                return d.title_en;
                            }
                        })()}
                    </ResultTitle>
                    <ResultDiffData>
                        {d.patterns.map((pt: ISearchPattern) => {
                            return <SearchResultPattern pt={pt}/>;
                        })}
                    </ResultDiffData>
                </ResultData>
            </ResultTable>
        ));

        return <>{rtn}</>;
    }
};

export default SearchResult;
