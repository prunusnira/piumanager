import {ITableTitle} from "../data/IMusicTable"
import {atom} from "recoil";
import {IMusic} from "../data/IMusic";

export const atomTableTitle = atom<ITableTitle>({
    key: 'atomTableTitle',
    default: {
        over: '',
        high: '',
        normalhigh: '',
        normal: '',
        normaleasy: '',
        easy: '',
        below: '',
        random: '',
    }
})

export const atomTableOver = atom<Array<IMusic>>({
    key: 'atomTableOver',
    default: []
})

export const atomTableHigh = atom<Array<IMusic>>({
    key: 'atomTableHigh',
    default: []
})

export const atomTableNH = atom<Array<IMusic>>({
    key: 'atomTableNH',
    default: []
})

export const atomTableNormal = atom<Array<IMusic>>({
    key: 'atomTableNormal',
    default: []
})

export const atomTableNE = atom<Array<IMusic>>({
    key: 'atomTableNE',
    default: []
})

export const atomTableEasy = atom<Array<IMusic>>({
    key: 'atomTableEasy',
    default: []
})

export const atomTableBelow = atom<Array<IMusic>>({
    key: 'atomTableBelow',
    default: []
})

export const atomTableRandom = atom<Array<IMusic>>({
    key: 'atomTableRandom',
    default: []
})