import React from "react";
import CommonData from "../../../data/commonData";
import { IMusic } from "../../../data/IMusic";
import { observer } from "mobx-react";
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
import {useRecoilState, useRecoilValue} from "recoil";
import {atomLanguage} from "../../../recoil/language";
import {atomStatus} from "../../../recoil/status";

interface Props {
    list: Array<IMusic>;
    keyv: string;
    showcheck: boolean;
    showrank: boolean;
}

const MusicItem = observer((props: Props) => {
    const language = useRecoilValue(atomLanguage);
    const [status, setStatus] = useRecoilState(atomStatus);

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
});

export default MusicItem;
