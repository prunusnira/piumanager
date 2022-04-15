import React from "react";
import IntegratedStore from "../../../mobx/integratedStore";
import CommonData from "../data/commonData";
import { MusicData } from "../data/musicData";
import { observer } from "mobx-react";
import {
    CheckBox,
    CheckBoxWrapper,
    JacketWrapper,
    NameWrapper,
    ObjWrapper,
    SongType,
} from "./piuTableObj.style";
import { ButtonEmpty } from "../../../styled/common.style";
import Jacket from "./jacket";

interface Props {
    list: Array<MusicData>;
    keyv: string;
    showcheck: boolean;
    showrank: boolean;
}

const PIUTableObj = observer((props: Props) => {
    const { status, language } = IntegratedStore;

    return (
        <>
            {props.list.map((d, i) => {
                const title = language.language === "ko" ? d.title_ko : d.title_en;

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
                                    status.status.selectedPatternId = d.ptid;
                                    status.status.selectedMusicTitle = title;
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

export default PIUTableObj;
