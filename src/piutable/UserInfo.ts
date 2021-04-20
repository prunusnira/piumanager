import { MusicData } from '../table/data/musicdataType';

class UserInfo {
    username: string = "";
    userlv: number = 0;
    lv: number = 0;
    type: string = "";
    lvdata: Map<string, Array<MusicData>> = new Map();
    stat: Map<string, string> = new Map();
}

export default UserInfo;