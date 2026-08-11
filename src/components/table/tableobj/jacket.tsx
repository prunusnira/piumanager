import React, {useState} from "react";
import {PatternDlgType} from "../../../data/patternDlgType";
import {BreakOff, JacketDiv, JacketImg, New, Rank, Removed, Version} from "./jacket.style";
import {IMusic} from "../../../data/IMusic";
import {convertVersion} from "../../../tools/convertVersion";
import CommonData from "../../../data/commonData";
import {rankToText} from "../../../tools/rankTextConvert";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {atomLanguage} from "../../../atoms/language";
import {atomPaternUpdateDialog, atomStatus} from "../../../atoms/status";
import {IPattern} from "../../../data/IPattern";
import {RankType} from "../../../data/rankType";

type Props = {
    pattern?: IPattern;
    bgImageUrl: string;
    musicData: IMusic;
    showrank: boolean;
};

const Jacket = ({pattern, bgImageUrl, musicData, showrank}: Props) => {
    const language = useAtomValue(atomLanguage);
    const [status, setStatus] = useAtom(atomStatus);
    const setPatternUpdateDialog = useSetAtom(atomPaternUpdateDialog);

    return (
        <JacketDiv
            onClick={() => {
                setStatus({
                    ...status,
                    patternUpdDlgType: PatternDlgType.SINGLE,
                    selectedPatternId: musicData.ptid,
                    selectedMusicTitle: language === 'ko' ? musicData.title_ko : musicData.title_en,
                })
                setPatternUpdateDialog(true)
            }}
        >
            {/*{(d.steptype === 1 || d.steptype === 2) && (*/}
            {/*    <StepType*/}
            {/*        alt="steptype"*/}
            {/*        src={`${process.env.PUBLIC_URL}/img/${d.steptype === 1 ? "half" : ""}${*/}
            {/*            d.steptype === 2 ? "perf" : ""*/}
            {/*        }.png`}*/}
            {/*    />*/}
            {/*)}*/}
            {convertVersion(musicData.version) !== '' &&
                <Version alt="version" src={`${process.env.PUBLIC_URL}/img/ver/${convertVersion(musicData.version)}.png`}/>
            }
            {musicData.newpattern === 1 && <New alt="new" src={`${process.env.PUBLIC_URL}/img/new.png`}/>}
            {musicData.removedPattern === 1 && <Removed alt={'removed'} src={`${process.env.PUBLIC_URL}/img/removed.png`}/>}
            <Rank
                alt="rank"
                id={`cs${musicData.ptid}`}
                display={showrank}
                src={`${process.env.PUBLIC_URL}/img/${rankToText(pattern?.rank || RankType.NP)}.png`}
            />
            <BreakOff
                alt="breakoff"
                id={`bo${musicData.ptid}`}
                src={`${process.env.PUBLIC_URL}/img/phrank/empty.png`}
            />
            <JacketImg
                alt="jacket"
                src={`${CommonData.imgUrl}${musicData.musicid}.png`}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `${process.env.PUBLIC_URL}/img/empty.png`;
                }}
            />
        </JacketDiv>
    );
};

export default Jacket;
