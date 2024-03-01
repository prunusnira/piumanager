import { useState } from "react"

const useModeChange = (
    mode: number, setPageMode: (mode: number) => void
) => {
    const [modeAlert, setModeAlert] = useState(false)
    const [targetMode, setTargetMode] = useState(0)

    const changeModeAlert = (tgtMode: number) => {
        // 같은 모드에서는 동작하지 않고 다른 모드일 때 경고 메시지를 띄움
        if(mode !== tgtMode) {
            setTargetMode(tgtMode)
            setModeAlert(true)
        }
    }

    const executeChange = () => {
        setPageMode(targetMode)
        closeDialog()
    }

    const closeDialog = () => {
        setModeAlert(false)
    }

    return {modeAlert, changeModeAlert, executeChange, closeDialog}
}

export default useModeChange