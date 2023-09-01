import { MusicData } from "./musicData";

export type MusicTable = {
    over: {
        title: string,
        data: MusicData[]
    },
    high: {
        title: string,
        data: MusicData[]
    },
    normalhigh: {
        title: string,
        data: MusicData[]
    },
    normal: {
        title: string,
        data: MusicData[]
    },
    normaleasy: {
        title: string,
        data: MusicData[]
    },
    easy: {
        title: string,
        data: MusicData[]
    },
    below: {
        title: string,
        data: MusicData[]
    },
    random: {
        title: string,
        data: MusicData[]
    },
}