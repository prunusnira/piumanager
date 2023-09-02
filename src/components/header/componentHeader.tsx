import React from "react"
import DialogModeChange from "../../dialog/dialogModeChange"
import HeaderPres from "./headerPres"
import useModeChange from "../../hooks/useModeChange"

interface Props {
    mode: number,
    setPageMode: (mode: number) => void,
}

const ComponentHeader = (props: Props) => {
    const {
        modeAlert, changeModeAlert, executeChange, closeDialog
    } = useModeChange(props.mode, props.setPageMode)

    return (
        <>
            <HeaderPres
                changeModeAlert={changeModeAlert} />
            <DialogModeChange
                modeAlert={modeAlert}
                executeChange={executeChange}
                closeDialog={closeDialog} />
        </>
    )
}

export default ComponentHeader