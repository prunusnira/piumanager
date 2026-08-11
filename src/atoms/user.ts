import {IUser} from "../data/IUser"
import {IPattern} from "../data/IPattern";
import {atom} from "jotai";

export const atomUser = atom<IUser>({
    userName: '',
    userLv: 0,
    userPattern: new Map<number, IPattern>(),
})

export const atomSingleSkill = atom<number>(0)

export const atomDoubleSkill = atom<number>(0)

export const atomSingleList = atom<Array<number>>([])

export const atomDoubleList = atom<Array<number>>([])
