import React, { useRef } from "react";
import { Button, InputGroup } from "reactstrap";
import TxtSearch from "./txtSearch";

interface Props {
    lang: string

    keyword: string,
    setKeyword: (k: string) => void,

    querySearch: (q: string) => void,
}

const SearchBar = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const updateValue = () => {
        const ref = inputRef.current;
        if(ref) {
            props.setKeyword(ref.value);
        }
    }

    const checkEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') runQuery();
    }

    const runQuery = () => {
        const ref = inputRef.current;
        if(ref) {
            // 엔터 입력 시 버튼 누르기
            props.querySearch(ref.value);
        }
    }
    
    return (
        <>
            <InputGroup>
                <input
                    className='form-control'
                    placeholder={(TxtSearch as any).placeholder[props.lang]}
                    ref={inputRef}
                    onChange={updateValue}
                    onKeyDown={(e) => checkEnter(e)} />
                <Button
                    onClick={runQuery}>
                    {(TxtSearch as any).btnSearch[props.lang]}
                </Button>
            </InputGroup>
        </>
    );
}

export default SearchBar;