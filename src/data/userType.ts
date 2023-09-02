import { RankType } from './rankType'

export interface UserData {
    rank: RankType,
    breakOff: boolean,
    side: number,
    lv: number,
}

type UserType = {
    userName: string,
    userLv: number,
    userStatus: Map<number, UserData>, // mid, data
}

export default UserType