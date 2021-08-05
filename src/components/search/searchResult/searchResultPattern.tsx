import React from "react";
import { Button } from "reactstrap";
import SearchPatternData from "../searchItems/searchPatternData"

const SearchResultPattern:React.FC<{pt: SearchPatternData}> = (pt) => {
    const process = () => {
        let type;
        if(pt.pt.sdtype === 0) {
            type = 'S'
        }
        else {
            type = 'D'
        }
        return (
            <Button color={(type === 'S') ? 'warning':'success'}>
                {type+pt.pt.lv}
            </Button>
        )
    }

    return (
        <>
            {process()}
        </>
    )
}

export default SearchResultPattern