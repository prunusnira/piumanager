import axios from "axios"
import CommonData from "../data/commonData"

export const apiSearch = async (searchTxt: string) => {
    const res = await axios.get(
        `${CommonData.dataUrl}search/${searchTxt.replace(' ', '')}/0`
    )
    return res.data
}