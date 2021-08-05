import { RankType } from './rankType'

type UserType = {
    userName: string,
    userLv: number,
    userStatus: Map<number, RankType>, // mid, data
}

export default UserType