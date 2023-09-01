import { RankType } from './rankType'

type UserType = {
    userName: string,
    userLv: number,
    userStatus: Map<number, {rank: RankType, breakOff: boolean}>, // mid, data
}

export default UserType