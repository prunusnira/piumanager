import { RankType } from "./rankType"

export type MusicData = {
    ptid: number
    musicid: number
    title_en: string
    title_ko: string
    sdtype: number
    lv: number
    steptype: number
    difficulty: number
    songtype: number
    removed: number
    version: number
    newpattern: number
    rank: RankType
    removedPattern: number
    breakOff: boolean
}

/** 버전
 * 1: 1st
 * 2: 2nd
 * 3: OBG
 * 4: OBGSE
 * 5: PC
 * 6: EXTRA
 * 7: REBIRTH
 * 8: PREX3
 * 9: EXCEED
 * 10: EXCEED2
 * 11: ZERO
 * 12: NX
 * 13: NX2
 * 14: NXA
 * 15: FIESTA
 * 16: FIESTA EX
 * 17: FIESTA 2
 * 18: PRIME
 * 19: PRIME2
 * 20: XX
 * */