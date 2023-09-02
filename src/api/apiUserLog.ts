import axios from "axios";
import CommonData from "../data/commonData";

export const apiUserLog = async (name: string, type: string) => {
    await axios.post(`${CommonData.dataUrl}userlog/${name}/${type}`);
};