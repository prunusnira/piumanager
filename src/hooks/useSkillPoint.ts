import {RankConstant, RankType} from "../data/rankType";
import {useEffect, useRef} from "react";
import {atomDoubleList, atomDoubleSkill, atomSingleList, atomSingleSkill, atomUser} from "../recoil/user";
import {useRecoilState, useRecoilValue} from "recoil";

const useSkillPoint = () => {
    const user = useRecoilValue(atomUser)
    const [skillListSingle, setListSingle] = useRecoilState(atomSingleList)
    const [skillListDouble, setListDouble] = useRecoilState(atomDoubleList)
    const [skillSingle, setSkillSingle] = useRecoilState(atomSingleSkill)
    const [skillDouble, setSkillDouble] = useRecoilState(atomDoubleSkill)
    const minSingle = useRef<number>(0)
    const minDouble = useRef<number>(0)

    useEffect(() => {
        order();
    }, [user])

    useEffect(() => {
        calculate();
    }, [skillListSingle, skillListDouble])

    const getRankConstant = (rank: RankType) => {
        switch(rank) {
            case RankType.PH_SSSPlus:
                return RankConstant.PH_SSSPlus;
            case RankType.PH_SSS:
                return RankConstant.PH_SSS;
            case RankType.PH_SSPlus:
                return RankConstant.PH_SSPlus;
            case RankType.PH_SS:
                return RankConstant.PH_SS;
            case RankType.PH_SPlus:
                return RankConstant.PH_SPlus;
            case RankType.PH_S:
                return RankConstant.PH_S;
            case RankType.PH_AAAPlus:
                return RankConstant.PH_AAAPlus;
            case RankType.PH_AAA:
                return RankConstant.PH_AAA;
            case RankType.PH_AAPlus:
                return RankConstant.PH_AAPlus;
            case RankType.PH_AA:
                return RankConstant.PH_AA;
            case RankType.PH_APlus:
                return RankConstant.PH_APlus;
            case RankType.PH_A:
                return RankConstant.PH_A;
            case RankType.PH_B:
                return RankConstant.PH_B;
            case RankType.PH_C:
                return RankConstant.PH_C;
            case RankType.PH_D:
                return RankConstant.PH_D;
            default:
                return RankConstant.PH_F;
        }
    }

    const order = () => {
        const keys = Array.from(user.userPattern.keys());
        const listSingle = new Array<number>();
        const listDouble = new Array<number>();
        keys.forEach((k, i) => {
            const {lv, rank, side, breakOff} = user.userPattern.get(k)!;
            const rankValue = getRankConstant(rank);
            const point = lv * rankValue;

            if(side === 0 && !breakOff) {
                if (listSingle.length < 50) {
                    listSingle.push(point);
                    listSingle.sort(function (a, b) {
                        return b - a
                    });
                    minSingle.current = listSingle[listSingle.length - 1];
                } else {
                    if (point > minSingle.current) {
                        listSingle.push(point);
                        listSingle.sort(function (a, b) {
                            return b - a
                        });
                        listSingle.pop();
                        minSingle.current = listSingle[listSingle.length - 1];
                    }
                }
            }

            if(side === 1 && !breakOff) {
                if (listDouble.length < 50) {
                    listDouble.push(point);
                    listDouble.sort(function (a, b) {
                        return b - a
                    });
                    minDouble.current = listDouble[listDouble.length - 1];
                } else {
                    if (point > minDouble.current) {
                        listDouble.push(point);
                        listDouble.sort(function (a, b) {
                            return b - a
                        });
                        listDouble.pop();
                        minDouble.current = listDouble[listDouble.length - 1];
                    }
                }
            }
        })
        setListSingle(listSingle);
        setListDouble(listDouble);
    }

    const calculate = () => {
        let sumSingle = 0;
        let sumDouble = 0;
        skillListSingle.map(x => sumSingle += x);
        setSkillSingle(sumSingle);
        skillListDouble.map(x => sumDouble += x);
        setSkillDouble(sumDouble);
    }

    return {skillSingle, skillDouble, order, calculate}
}

export default useSkillPoint