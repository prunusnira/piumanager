import {makeAutoObservable} from 'mobx'
import UserType from "../components/table/data/userType"

const emptyUser: UserType = {
    userName: '',
    userLv: 0,
    userStatus: new Map(),
}

class StoreUser {
    public user = emptyUser

    public setUser = (data: UserType) => {
        this.user = data
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new StoreUser()