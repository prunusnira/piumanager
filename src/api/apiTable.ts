import axios from "axios"
import CommonData from "../data/commonData"
import { PatternType } from "../data/patternType"
import {IMusic} from "../data/IMusic";

export const apiCheckSaved = async (savedId: string) => {
    const res = await axios.get(`${CommonData.dataUrl}saved/${savedId}/0`)
    return res.data
}

export const apiGetPatternData = async (pattern: PatternType, lv: number) => {
    const type =
        pattern === PatternType.SINGLE ? 's' :
        pattern === PatternType.DOUBLE ? 'd' :
        pattern === PatternType.COOP ? 'c' : ''
    
    if(type !== '') {
        const res = await axios.get<IMusic[]>(`${CommonData.dataUrl}ptlist/${type}/${lv}`);
        return res.data;
    }
    return undefined;
}

export const apiShareCreate = async (code: string, data: string) => {
    const res = await axios.post(`${CommonData.dataUrl}share/${code}/0`,
    {
        "data": data
    },
    {
        headers: {
            "Content-Type": "application/json"
        }
    })

    return res
}