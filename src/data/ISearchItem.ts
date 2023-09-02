import {ISearchPattern} from "./ISearchPattern"

export interface ISearchItem {
    musicid: number
    title_ko: string
    title_en: string
    patterns: ISearchPattern[]
}

export const emptySearchItem: ISearchItem = {
    musicid: 1,
    title_ko: '',
    title_en: '',
    patterns: Array<ISearchPattern>(),
}
