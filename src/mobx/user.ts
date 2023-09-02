import {makeAutoObservable} from 'mobx'
import UserType from "../data/userType"

const emptyUser: UserType = {
    userName: '',
    userLv: 0,
    userStatus: new Map(),
    userSkill: 0,
}

class StoreUser {
    public user = emptyUser

    constructor() {
        makeAutoObservable(this)
    }

    public setUser = (data: UserType) => {
        this.user = data
    }

    public setUserName = (name: string) => {
        this.user.userName = name;
    }
}

const User = new StoreUser()

export default User