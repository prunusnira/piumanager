import MusicInfo from './musicInfo';

class UserInfo {
    username: string = "";
    userlv: string = "";
    lv: number = 0;
    type: string = "";
    lvdata: Map<string, Array<MusicInfo>> = new Map();
    stat: Map<string, string> = new Map();
}

export default UserInfo;