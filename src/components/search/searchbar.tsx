import React, { ChangeEvent } from "react"
import { Button, InputGroup } from "reactstrap"
import { observer } from "mobx-react"

import TxtSearchKo from "../../text/search/txtSearch-ko"
import TxtSearchJp from "../../text/search/txtSearch-jp"
import TxtSearchEn from "../../text/search/txtSearch-en"
import TxtSearchCn from "../../text/search/txtSearch-cn"
import IntegratedStore from "../../mobx/integratedStore"

interface Props {
    setKeyword: (k: string) => void,
    runQuery: () => void,
    checkEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

const SearchBar = observer((props: Props) => {
    const {language} = IntegratedStore

    const TxtSearch =
        language.language === 'ko' ? TxtSearchKo :
        language.language === 'jp' ? TxtSearchJp :
        language.language === 'cn' ? TxtSearchCn : TxtSearchEn
    
    return (
        <>
            <InputGroup>
                <input
                    className='form-control'
                    placeholder={TxtSearch.placeholder}
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => {
                            props.setKeyword(e.currentTarget.value)
                        }
                    }
                    onKeyDown={(e) => props.checkEnter(e)} />
                <Button
                    onClick={props.runQuery}>
                    {TxtSearch.btnSearch}
                </Button>
            </InputGroup>
        </>
    )
})

export default SearchBar