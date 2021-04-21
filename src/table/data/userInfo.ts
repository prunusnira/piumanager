import { MusicData } from './musicdataType';

type UserInfo = {
    username: string;
    userlv: number;
    lv: number;
    type: string;
    lvdata: Map<string, Array<MusicData>>;
    stat: Map<string, string>;
}

export default UserInfo;