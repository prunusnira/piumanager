import {IUser} from "../data/IUser"
import {IPattern} from "../data/IPattern";
import {atom} from "recoil";

export const atomUser = atom<IUser>({
    key: 'atomUser',
    default: {
        userName: '',
        userLv: 0,
        userPattern: new Map<number, IPattern>(),
    }
})

export const atomSingleSkill = atom<number>({
    key: 'atomSingleSkill',
    default: 0
})

export const atomDoubleSkill = atom<number>({
    key: 'atomDoubleSkill',
    default: 0
})

export const atomSingleList = atom<Array<number>>({
    key: 'atomSingleList',
    default: []
})

export const atomDoubleList = atom<Array<number>>({
    key: 'atomDoubleList',
    default: []
})