import { RankType } from "./rankType"

export const rankToText = (rankType: RankType) => {
    let rank = ''
    switch(rankType) {
        case RankType.SSS:
            rank = 'grade_0'
            break
        case RankType.SS:
            rank = 'grade_1'
            break
        case RankType.S:
            rank = 'grade_2'
            break
        case RankType.Aon:
            rank = 'grade_3'
            break
        case RankType.Aoff:
            rank = 'grade_4'
            break
        case RankType.BCDon:
            rank = 'grade_8'
            break
        case RankType.BCDoff:
            rank = 'grade_5'
            break
        case RankType.F:
            rank = 'grade_6'
            break
        case RankType.NP:
            rank = 'phrank/noplay'
            break
        case RankType.PH_SSSPlus:
            rank = 'phrank/sssp';
            break;
        case RankType.PH_SSS:
            rank = 'phrank/sss';
            break;
        case RankType.PH_SSPlus:
            rank = 'phrank/ssp';
            break;
        case RankType.PH_SS:
            rank = 'phrank/ss';
            break;
        case RankType.PH_SPlus:
            rank = 'phrank/sp';
            break;
        case RankType.PH_S:
            rank = 'phrank/s';
            break;
        case RankType.PH_AAAPlus:
            rank = 'phrank/aaap';
            break;
        case RankType.PH_AAA:
            rank = 'phrank/aaa';
            break;
        case RankType.PH_AAPlus:
            rank = 'phrank/aap';
            break;
        case RankType.PH_AA:
            rank = 'phrank/aa';
            break;
        case RankType.PH_APlus:
            rank = 'phrank/ap';
            break;
        case RankType.PH_A:
            rank = 'phrank/a';
            break;
        case RankType.PH_B:
            rank = 'phrank/b';
            break;
        case RankType.PH_C:
            rank = 'phrank/c';
            break;
        case RankType.PH_D:
            rank = 'phrank/d';
            break;
        case RankType.PH_F:
            rank = 'phrank/f';
            break;
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
        case '9':
            rank = RankType.PH_SSSPlus
            break
        case '10':
            rank = RankType.PH_SSS
            break
        case '11':
            rank = RankType.PH_SSPlus
            break
        case '12':
            rank = RankType.PH_SS
            break
        case '13':
            rank = RankType.PH_SPlus
            break
        case '14':
            rank = RankType.PH_S
            break
        case '15':
            rank = RankType.PH_AAAPlus
            break
        case '16':
            rank = RankType.PH_AAA
            break
        case '17':
            rank = RankType.PH_AAPlus
            break
        case '18':
            rank = RankType.PH_AA
            break
        case '19':
            rank = RankType.PH_APlus
            break
        case '20':
            rank = RankType.PH_A
            break
        case '21':
            rank = RankType.PH_B
            break
        case '22':
            rank = RankType.PH_C
            break
        case '23':
            rank = RankType.PH_D
            break
        case '24':
            rank = RankType.PH_F
            break
    }

    return rank
}