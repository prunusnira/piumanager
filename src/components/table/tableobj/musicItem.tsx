import React from "react";
import CommonData from "../../../data/commonData";
import { IMusic } from "../../../data/IMusic";
import {
    CheckBox,
    CheckBoxWrapper,
    JacketWrapper,
    NameWrapper,
    ObjWrapper,
    SongType,
} from "./musicItem.style";
import { ButtonEmpty } from "../../../styled/common.style";
import Jacket from "./jacket";
import {useAtom, useAtomValue} from "jotai";
import {atomLanguage} from "../../../atoms/language";
import {atomStatus} from "../../../atoms/status";
import {IPattern} from "../../../data/IPattern";

interface Props {
    pattern: Map<number, IPattern>;
    list: Array<IMusic>;
    keyv: string;
    showcheck: boolean;
    showrank: boolean;
}

const MusicItem = (props: Props) => {
    const language = useAtomValue(atomLanguage);
    const [status, setStatus] = useAtom(atomStatus);

    const getUserData = (ptid: number) => {
        return props.pattern.get(ptid);
    }

    return (
        <>
            {props.list.map((d, i) => {
                const title = language === "ko" ? d.title_ko : d.title_en;

                if(!status.showRemovedPattern && d.removedPattern === 1) return <></>;

                return (
                    <ObjWrapper key={props.keyv + i}>
                        <SongType data-songtype={d.songtype} />
                        <CheckBoxWrapper>
                            <CheckBox
                                display={props.showcheck}
                                type="checkbox"
                                id="ptnsel"
                                value={d.ptid}
                            />
                        </CheckBoxWrapper>
                        <JacketWrapper>
                            <Jacket
                                pattern={getUserData(d.ptid)}
                                bgImageUrl={`${CommonData.imgUrl}${d.musicid}.png`}
                                musicData={d}
                                showrank={props.showrank}
                            />
                        </JacketWrapper>
                        <NameWrapper>
                            <ButtonEmpty
                                onClick={() => {
                                    setStatus({
                                        ...status,
                                        selectedPatternId: d.ptid,
                                        selectedMusicTitle: title
                                    })
                                }}
                            >
                                {title}
                            </ButtonEmpty>
                        </NameWrapper>
                    </ObjWrapper>
                );
            })}
        </>
    );
};

export default MusicItem;
