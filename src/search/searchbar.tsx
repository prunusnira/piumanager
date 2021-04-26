import React from "react";
import { Button, Input, InputGroup } from "reactstrap";
import TxtSearch from "./txtSearch";

interface Props {
    lang: string
}

const SearchBar = (props: Props) => {
    return (
        <>
            <InputGroup>
                <Input
                    placeholder={(TxtSearch as any).placeholder[props.lang]} />
                <Button>{(TxtSearch as any).btnSearch[props.lang]}</Button>
            </InputGroup>
        </>
    );
}

export default SearchBar;