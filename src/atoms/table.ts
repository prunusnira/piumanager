import {ITableTitle} from "../data/IMusicTable"
import {atom} from "jotai";
import {IMusic} from "../data/IMusic";

export const atomTableTitle = atom<ITableTitle>({
    over: '',
    high: '',
    normalhigh: '',
    normal: '',
    normaleasy: '',
    easy: '',
    below: '',
    random: '',
})

export const atomTable = atom<IMusic[]>([]);

export const atomTableOver = atom<Array<IMusic>>([])
export const atomTableHigh = atom<Array<IMusic>>([])
export const atomTableNH = atom<Array<IMusic>>([])
export const atomTableNormal = atom<Array<IMusic>>([])
export const atomTableNE = atom<Array<IMusic>>([])
export const atomTableEasy = atom<Array<IMusic>>([])
export const atomTableBelow = atom<Array<IMusic>>([])
export const atomTableRandom = atom<Array<IMusic>>([])
