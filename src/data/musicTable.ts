import { IMusic } from "./IMusic";

export type MusicTable = {
    over: {
        title: string,
        data: IMusic[]
    },
    high: {
        title: string,
        data: IMusic[]
    },
    normalhigh: {
        title: string,
        data: IMusic[]
    },
    normal: {
        title: string,
        data: IMusic[]
    },
    normaleasy: {
        title: string,
        data: IMusic[]
    },
    easy: {
        title: string,
        data: IMusic[]
    },
    below: {
        title: string,
        data: IMusic[]
    },
    random: {
        title: string,
        data: IMusic[]
    },
}