import { RankType } from "./rankType"

export const rankToText = (rankType: RankType) => {
    let rank = ''
    switch(rankType) {
        case RankType.SSS:
            rank = '0'
            break
        case RankType.SS:
            rank = '1'
            break
        case RankType.S:
            rank = '2'
            break
        case RankType.Aon:
            rank = '3'
            break
        case RankType.Aoff:
            rank = '4'
            break
        case RankType.BCDon:
            rank = '8'
            break
        case RankType.BCDoff:
            rank = '5'
            break
        case RankType.F:
            rank = '6'
            break
        case RankType.NP:
            rank = '7'
            break
    }

    return rank
}

export const textToRank = (text: string) => {
    let rank = RankType.NP
    switch(text) {
        case '0':
        case 'sss':
            rank = RankType.SSS
            break
        case '1':
        case 'ss':
            rank = RankType.SS
            break
        case '2':
        case 's':
            rank = RankType.S
            break
        case '3':
        case 'aon':
            rank = RankType.Aon
            break
        case '4':
        case 'aoff':
            rank = RankType.Aoff
            break
        case '8':
        case 'bcdon':
            rank = RankType.BCDon
            break
        case '5':
        case 'bcdoff':
            rank = RankType.BCDoff
            break
        case '6':
        case 'f':
            rank = RankType.F
            break
        case '7':
        case 'np':
        default:
            rank = RankType.NP
            break
    }

    return rank
}