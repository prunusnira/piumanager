import React from "react";
import CommonData from "../../table/data/commonData";
import SearchItemData from "../searchItems/searchItemData";
import SearchResultPattern from "./searchResultPattern";
import { observer } from "mobx-react";

import TxtSearchKo from "../../../text/search/txtSearch-ko";
import TxtSearchJp from "../../../text/search/txtSearch-jp";
import TxtSearchEn from "../../../text/search/txtSearch-en";
import TxtSearchCn from "../../../text/search/txtSearch-cn";
import IntegratedStore from "../../../mobx/integratedStore";
import {
    ResultEmpty,
    ResultTable,
    ResultJacket,
    ResultData,
    ResultTitle,
    ResultDiffData,
} from "./searchResult.style";

interface Props {
    list: Array<SearchItemData>;
}

const SearchResult = observer((props: Props) => {
    const { language } = IntegratedStore;

    const TxtSearch =
        language.language === "ko"
            ? TxtSearchKo
            : language.language === "jp"
            ? TxtSearchJp
            : language.language === "cn"
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
                    onError={(e) => {
                        e.currentTarget.src = `${process.env.PUBLIC_URL}/img/empty.jpg`;
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
                            if (language.language === "ko") {
                                return d.title_ko;
                            } else {
                                return d.title_en;
                            }
                        })()}
                    </ResultTitle>
                    <ResultDiffData>
                        {d.patterns.map((d) => {
                            return <SearchResultPattern pt={d} />;
                        })}
                    </ResultDiffData>
                </ResultData>
            </ResultTable>
        ));

        return <>{rtn}</>;
    }
});

export default SearchResult;
