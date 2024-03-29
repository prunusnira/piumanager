import React, {ChangeEvent} from "react";
import {observer} from "mobx-react";
import TxtSearchKo from "../../text/search/txtSearch-ko";
import TxtSearchJp from "../../text/search/txtSearch-jp";
import TxtSearchEn from "../../text/search/txtSearch-en";
import TxtSearchCn from "../../text/search/txtSearch-cn";
import {SearchBarElem, SearchBarWrapper, SearchButton} from "./searchbar.style";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useRecoilValue} from "recoil";
import {atomLanguage} from "../../recoil/language";

interface Props {
    setKeyword: (k: string) => void;
    runQuery: () => void;
    checkEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    withRemoved: boolean;
    setWithRemoved: (b: boolean) => void;
}

const SearchBar = observer((props: Props) => {
    const language = useRecoilValue(atomLanguage)

    const TxtSearch =
        language === "ko"
            ? TxtSearchKo
            : language === "jp"
                ? TxtSearchJp
                : language === "cn"
                    ? TxtSearchCn
                    : TxtSearchEn;

    return (
        <SearchBarWrapper>
            <SearchBarElem
                type="text"
                placeholder={TxtSearch.placeholder}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    props.setKeyword(e.currentTarget.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => props.checkEnter(e)}
            />
            <SearchButton onClick={props.runQuery}>
                <FontAwesomeIcon icon={faSearch}/>
            </SearchButton>
        </SearchBarWrapper>
    );
});

export default SearchBar;
