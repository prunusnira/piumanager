import { useEffect } from "react"
import IntegratedStore from "../../../mobx/integratedStore"

const useTableMenu = () => {
    const {status} = IntegratedStore

    // 체크박스 등록/해제에 따른 effect
    useEffect(() => {
        musicTypeOnOff(0, "musarcade")
    }, [status.status.showArcade])

    useEffect(() => {
        musicTypeOnOff(1, "musshort")
    }, [status.status.showShort])

    useEffect(() => {
        musicTypeOnOff(2, "musfull")
    }, [status.status.showFull])

    useEffect(() => {
        musicTypeOnOff(3, "musremix")
    }, [status.status.showRemix])

    const musicTypeOnOff = (type: number, bid: string) => {
        const box = document.getElementById(bid) as HTMLInputElement;
        const divs = document.querySelectorAll(`[data-songtype='${type}']`);
        if(box && box.checked) {
            for(let i = 0; i < divs.length; i++) {
                (divs[i].parentNode! as HTMLElement).style.display = "block";
            }
        }
        else {
            for(let i = 0; i < divs.length; i++) {
                (divs[i].parentNode! as HTMLElement).style.display = "none";
            }
        }
    }
}

export default useTableMenu