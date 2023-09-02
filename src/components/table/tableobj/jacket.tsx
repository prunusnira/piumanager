import {title} from "process";
import React, {useState} from "react";
import IntegratedStore from "../../../mobx/integratedStore";
import {PatternDlgType} from "../../../data/patternDlgType";
import {BreakOff, JacketDiv, JacketImg, New, Rank, Removed, Version} from "./jacket.style";
import {observer} from "mobx-react";
import {MusicData} from "../../../data/musicData";
import {StepType} from "./jacket.style";
import {convertVersion} from "../../tools/convertVersion";
import CommonData from "../../../data/commonData";
import {rankToText} from "../../../data/rankTextConvert";

type Props = {
    bgImageUrl: string;
    musicData: MusicData;
    showrank: boolean;
};

const Jacket = observer(({bgImageUrl, musicData: d, showrank}: Props) => {
    const [ver] = useState(convertVersion(d.version));
    const {status} = IntegratedStore;

    return (
        <JacketDiv
            onClick={() => {
                status.setPatternUpdDlgType(PatternDlgType.SINGLE);
                status.setSelectedPatternId(d.ptid);
                status.setSelectedMusicTitle(title);
                status.setShowPatternUpdateDialog(true);
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
            {ver !== "" && (
                <Version alt="version" src={`${process.env.PUBLIC_URL}/img/ver/${ver}.png`}/>
            )}
            {d.newpattern === 1 && <New alt="new" src={`${process.env.PUBLIC_URL}/img/new.png`}/>}
            {d.removedPattern === 1 && <Removed alt={'removed'} src={`${process.env.PUBLIC_URL}/img/removed.png`}/>}
            <Rank
                alt="rank"
                id={`cs${d.ptid}`}
                display={showrank}
                src={`${process.env.PUBLIC_URL}/img/${rankToText(d.rank)}.png`}
            />
            <BreakOff
                alt="breakoff"
                id={`bo${d.ptid}`}
                src={`${process.env.PUBLIC_URL}/img/phrank/empty.png`}
            />
            <JacketImg
                alt="jacket"
                src={`${CommonData.imgUrl}${d.musicid}.png`}
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `${process.env.PUBLIC_URL}/img/empty.png`;
                }}
            />
        </JacketDiv>
    );
});

export default Jacket;
