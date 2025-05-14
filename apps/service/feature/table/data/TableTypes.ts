export type PatternType = 'SINGLE' | 'DOUBLE' | 'CO-OP';

export type UserDialog = 'NEWUSER' | 'EDITUSER';

export type Reset = 'NONE' | 'NEW' | 'LOAD';

export type ShareDialog = 'SUCCESS' | 'FAIL';

export type UpdateDialog = 'SINGLE' | 'MULTIPLE';

export type RankType =
    | 'SSS'
    | 'SS'
    | 'S'
    | 'Aon'
    | 'Aoff'
    | 'BCDoff'
    | 'F'
    | 'NP'
    | 'BCDon'
    | 'PH_SSSPlus'
    | 'PH_SSS'
    | 'PH_SSPlus'
    | 'PH_SS'
    | 'PH_SPlus'
    | 'PH_S'
    | 'PH_AAAPlus'
    | 'PH_AAA'
    | 'PH_AAPlus'
    | 'PH_AA'
    | 'PH_APlus'
    | 'PH_A'
    | 'PH_B'
    | 'PH_C'
    | 'PH_D'
    | 'PH_F';

export interface RankCounts {
    sssp: number;
    sss: number;
    ssp: number;
    ss: number;
    sp: number;
    s: number;
    aaap: number;
    aaa: number;
    aap: number;
    aa: number;
    ap: number;
    a: number;
    b: number;
    c: number;
    d: number;
    f: number;
    ssspb: number;
    sssb: number;
    sspb: number;
    ssb: number;
    spb: number;
    sb: number;
    aaapb: number;
    aaab: number;
    aapb: number;
    aab: number;
    apb: number;
    ab: number;
    bb: number;
    cb: number;
    db: number;
    fb: number;
}

export const emptyRankCount: RankCounts = {
    sssp: 0,
    sss: 0,
    ssp: 0,
    ss: 0,
    sp: 0,
    s: 0,
    aaap: 0,
    aaa: 0,
    aap: 0,
    aa: 0,
    ap: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    f: 0,
    ssspb: 0,
    sssb: 0,
    sspb: 0,
    ssb: 0,
    spb: 0,
    sb: 0,
    aaapb: 0,
    aaab: 0,
    aapb: 0,
    aab: 0,
    apb: 0,
    ab: 0,
    bb: 0,
    cb: 0,
    db: 0,
    fb: 0,
};
