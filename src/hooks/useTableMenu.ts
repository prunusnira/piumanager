import { useEffect, useRef } from "react"
import {useRecoilValue} from "recoil";
import {atomStatus} from "../recoil/status";

const useTableMenu = () => {
    const status = useRecoilValue(atomStatus);

    const selDiffSingle = useRef<HTMLSelectElement>(null)
    const selDiffDouble = useRef<HTMLSelectElement>(null)
    const selDiffCoop = useRef<HTMLSelectElement>(null)

    // 체크박스 등록/해제에 따른 effect
    useEffect(() => {
        musicTypeOnOff(0, "musarcade")
    }, [status.showArcade])

    useEffect(() => {
        musicTypeOnOff(1, "musshort")
    }, [status.showShort])

    useEffect(() => {
        musicTypeOnOff(2, "musfull")
    }, [status.showFull])

    useEffect(() => {
        musicTypeOnOff(3, "musremix")
    }, [status.showRemix])

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

    const diffSelReset = () => {
        selDiffSingle.current!.value = '--'
        selDiffDouble.current!.value = '--'
        selDiffCoop.current!.value = '--'
    }

    return {selDiffSingle, selDiffDouble, selDiffCoop, diffSelReset}
}

export default useTableMenu