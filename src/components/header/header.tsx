import React from "react"
import HeaderModal from "./headerModal"
import HeaderPres from "./headerPres"
import useHeader from "./useHeader"

interface Props {
    mode: number,
    setPageMode: (mode: number) => void,
}

const Header = (props: Props) => {
    const [
        modeAlert, changeModeAlert, executeChange, closeDialog
    ] = useHeader(props.mode, props.setPageMode)

    return (
        <>
            <HeaderPres
                changeModeAlert={changeModeAlert} />
            <HeaderModal
                modeAlert={modeAlert}
                executeChange={executeChange}
                closeDialog={closeDialog} />
        </>
    )
}

export default Header