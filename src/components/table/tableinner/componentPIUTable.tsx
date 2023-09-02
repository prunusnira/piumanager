import React from "react";
import { faImages, faShareAltSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { unixTimeToText } from "../../../tools/unixTimeToText";
import MusicItem from "../tableobj/musicItem";
import { observer } from "mobx-react";
import { PatternType } from "../../../data/patternType";
import {
    DataInner,
    DataTitle,
    DataWrapper,
    ScoreTableLv,
    ScoreTableTitle,
    ScoreTableTitleMenu,
    ScoreTableClearCount,
    ScoreTableWrapper, ScoreTableUserData, ScoreTableProfile,
} from "./componentPIUTable.style";
import { Button } from "../../../styled/common.style";
import {TextCommon, TextCommonProfile, TextTableTitle, TextTitleSub} from "../../../styled/common.font";
import useShare from "../../../hooks/useShare";
import useSkillPoint from "../../../hooks/useSkillPoint";
import {useRecoilValue} from "recoil";
import {atomStatus} from "../../../recoil/status";
import {atomUser} from "../../../recoil/user";
import {
    atomTableBelow, atomTableEasy,
    atomTableHigh, atomTableNE,
    atomTableNH, atomTableNormal,
    atomTableOver,
    atomTableRandom, atomTableTitle
} from "../../../recoil/table";

const ComponentPIUTable = observer(() => {
    const status = useRecoilValue(atomStatus)
    const user = useRecoilValue(atomUser)
    // const table = useRecoilValue(atomTable)
    const tableTitle = useRecoilValue(atomTableTitle);
    const tableOver = useRecoilValue(atomTableOver)
    const tableHigh = useRecoilValue(atomTableHigh)
    const tableNormalHigh = useRecoilValue(atomTableNH)
    const tableNormal = useRecoilValue(atomTableNormal)
    const tableNormalEasy = useRecoilValue(atomTableNE)
    const tableEasy = useRecoilValue(atomTableEasy)
    const tableBelow = useRecoilValue(atomTableBelow)
    const tableRandom = useRecoilValue(atomTableRandom)

    const {scrShot, shareURL} = useShare();
    const {skillSingle, skillDouble} = useSkillPoint();

    return (
        <ScoreTableWrapper display={status.isUserLoaded} id="targetTable">
            <ScoreTableTitle>
                <TextTableTitle>Pump It Up Clear Table</TextTableTitle>
                <ScoreTableTitleMenu>
                    <Button
                        onClick={() => {
                            scrShot(
                                "targetTable",
                                `piu_${user.userName}_${status.patternType}_${
                                    status.patternLv
                                }_${unixTimeToText(new Date().getTime())}.jpg`
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faImages} />
                    </Button>
                    <Button onClick={() => shareURL()}>
                        <FontAwesomeIcon icon={faShareAltSquare} />
                    </Button>
                </ScoreTableTitleMenu>
            </ScoreTableTitle>
            <ScoreTableProfile>
                <ScoreTableUserData>
                    <TextTitleSub>PLAYER</TextTitleSub>
                    <TextCommonProfile>{user.userName}</TextCommonProfile>
                </ScoreTableUserData>
                <ScoreTableUserData>
                    <TextTitleSub>
                        SKILL POINTS (SINGLE)
                    </TextTitleSub>
                    <TextCommonProfile>{skillSingle.toFixed(2)}</TextCommonProfile>
                </ScoreTableUserData>
                <ScoreTableUserData>
                    <TextTitleSub>
                        SKILL POINTS (DOUBLE)
                    </TextTitleSub>
                    <TextCommonProfile>{skillDouble.toFixed(2)}</TextCommonProfile>
                </ScoreTableUserData>
            </ScoreTableProfile>
            <ScoreTableClearCount>
                <TextCommon>SSS+: {status.rankcount.sssp} (BO {status.rankcount.ssspb})</TextCommon>
                <TextCommon>SSS: {status.rankcount.sss} (BO {status.rankcount.sssb})</TextCommon>
                <TextCommon>SS+: {status.rankcount.ssp} (BO {status.rankcount.sspb})</TextCommon>
                <TextCommon>SS: {status.rankcount.ss} (BO {status.rankcount.ssb})</TextCommon>
                <TextCommon>S+: {status.rankcount.sp} (BO {status.rankcount.spb})</TextCommon>
                <TextCommon>S: {status.rankcount.s} (BO {status.rankcount.sb})</TextCommon>
                <TextCommon>AAA+: {status.rankcount.aaap} (BO {status.rankcount.aaapb})</TextCommon>
                <TextCommon>AAA: {status.rankcount.aaa} (BO {status.rankcount.aaab})</TextCommon>
                <TextCommon>AA+: {status.rankcount.aap} (BO {status.rankcount.aapb})</TextCommon>
                <TextCommon>AA: {status.rankcount.aa} (BO {status.rankcount.aab})</TextCommon>
                <TextCommon>A+: {status.rankcount.ap} (BO {status.rankcount.apb})</TextCommon>
                <TextCommon>A: {status.rankcount.a} (BO {status.rankcount.ab})</TextCommon>
                <TextCommon>B: {status.rankcount.b} (BO {status.rankcount.bb})</TextCommon>
                <TextCommon>C: {status.rankcount.c} (BO {status.rankcount.cb})</TextCommon>
                <TextCommon>D: {status.rankcount.d} (BO {status.rankcount.db})</TextCommon>
                <TextCommon>F: {status.rankcount.f} (BO {status.rankcount.fb})</TextCommon>
            </ScoreTableClearCount>

            <ScoreTableLv>
                {status.patternType === PatternType.SINGLE
                    ? "Single"
                    : status.patternType === PatternType.DOUBLE
                        ? "Double"
                        : "CO-OP"}
                &nbsp; Lv.{status.patternLv}
            </ScoreTableLv>

            {tableOver.length > 0 && (
                <DataWrapper bgColor={"#ffadc5"} id="divOver">
                    <DataTitle id="catOver">{tableTitle.over}</DataTitle>
                    <DataInner id="lvOver">
                        <MusicItem
                            list={tableOver}
                            keyv="ov"
                            showrank={status.showTableRank}
                            showcheck={status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {tableHigh.length > 0 && (
                <DataWrapper bgColor={"#ffa9b0"} id="divHigh">
                    <DataTitle id="catHigh">{tableTitle.high}</DataTitle>
                    <DataInner id="lvHigh">
                        <MusicItem
                            list={tableHigh}
                            keyv="hi"
                            showrank={status.showTableRank}
                            showcheck={status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {tableNormalHigh.length > 0 && (
                <DataWrapper bgColor={"#ffdda6"} id="divNH">
                    <DataTitle id="catNH">{tableTitle.normalhigh}</DataTitle>
                    <DataInner id="lvNH">
                        <MusicItem
                            list={tableNormalHigh}
                            keyv="nh"
                            showrank={status.showTableRank}
                            showcheck={status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {tableNormal.length > 0 && (
                <DataWrapper bgColor={"#f8e5d0"} id="divNormal">
                    <DataTitle id="catNormal">{tableTitle.normal}</DataTitle>
                    <DataInner id="lvNormal">
                        <MusicItem
                            list={tableNormal}
                            keyv="nr"
                            showrank={status.showTableRank}
                            showcheck={status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {tableNormalEasy.length > 0 && (
                <DataWrapper bgColor={"#a9e2c5"} id="divNE">
                    <DataTitle id="catNE">{tableTitle.normaleasy}</DataTitle>
                    <DataInner id="lvNE">
                        <MusicItem
                            list={tableNormalEasy}
                            keyv="ne"
                            showrank={status.showTableRank}
                            showcheck={status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {tableEasy.length > 0 && (
                <DataWrapper bgColor={"#bbd1e8"} id="divEasy">
                    <DataTitle id="catEasy">{tableTitle.easy}</DataTitle>
                    <DataInner id="lvEasy">
                        <MusicItem
                            list={tableEasy}
                            keyv="ez"
                            showrank={status.showTableRank}
                            showcheck={status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {tableBelow.length > 0 && (
                <DataWrapper bgColor={"#c6d6f7"} id="divBelow">
                    <DataTitle id="catBelow">{tableTitle.below}</DataTitle>
                    <DataInner id="lvBelow">
                        <MusicItem
                            list={tableBelow}
                            keyv="be"
                            showrank={status.showTableRank}
                            showcheck={status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {tableRandom.length > 0 && (
                <DataWrapper bgColor={"#ab95d4"} id="divRandom">
                    <DataTitle id="catRandom">{tableTitle.random}</DataTitle>
                    <DataInner id="lvRandom">
                        <MusicItem
                            list={tableRandom}
                            keyv="rd"
                            showrank={status.showTableRank}
                            showcheck={status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}
        </ScoreTableWrapper>
    );
});

export default ComponentPIUTable;
