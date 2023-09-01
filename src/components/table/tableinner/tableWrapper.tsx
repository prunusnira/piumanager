import React from "react";
import { faImages, faShareAltSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { unixTimeToText } from "../tool";
import PIUTableObj from "../tableobj/piuTableObj";
import IntegratedStore from "../../../mobx/integratedStore";
import { observer } from "mobx-react";
import { PatternType } from "../../../data/patternType";
import {
    DataInner,
    DataTitle,
    DataWrapper,
    ScoreTableLv,
    ScoreTableTitle,
    ScoreTableTitleMenu,
    ScoreTableUserInfo,
    ScoreTableWrapper,
} from "./tableWrapper.style";
import { Button } from "../../../styled/common.style";
import {TextCommon, TextTableTitle, TextTitleSub} from "../../../styled/common.font";

interface TableProps {
    scrShot: (div: string, file: string) => void;
    shareURL: () => void;
}

const TableWrapper = observer((props: TableProps) => {
    const { status, user, table } = IntegratedStore;

    return (
        <ScoreTableWrapper display={status.status.isUserLoaded} id="targetTable">
            <ScoreTableTitle>
                <h4>Pump It Up</h4>
                <ScoreTableTitleMenu>
                    <Button
                        onClick={() => {
                            props.scrShot(
                                "targetTable",
                                `piu_${user.user.userName}_${status.status.patternType}_${
                                    status.status.patternLv
                                }_${unixTimeToText(new Date().getTime())}.jpg`
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faImages} />
                    </Button>
                    <Button onClick={() => props.shareURL()}>
                        <FontAwesomeIcon icon={faShareAltSquare} />
                    </Button>
                </ScoreTableTitleMenu>
            </ScoreTableTitle>
            <ScoreTableLv>
                <TextTableTitle>
                    {status.status.patternType === PatternType.SINGLE
                        ? "Single"
                        : status.status.patternType === PatternType.DOUBLE
                        ? "Double"
                        : "CO-OP"}
                    &nbsp; Lv.{status.status.patternLv} Clear Table
                </TextTableTitle>
                <TextTitleSub>{user.user.userName}</TextTitleSub>
            </ScoreTableLv>
            <ScoreTableUserInfo>
                <TextCommon>SSS+: {status.status.rankcount.sssp} (BO {status.status.rankcount.ssspb})</TextCommon>
                <TextCommon>SSS: {status.status.rankcount.sss} (BO {status.status.rankcount.sssb})</TextCommon>
                <TextCommon>SS+: {status.status.rankcount.ssp} (BO {status.status.rankcount.sspb})</TextCommon>
                <TextCommon>SS: {status.status.rankcount.ss} (BO {status.status.rankcount.ssb})</TextCommon>
                <TextCommon>S+: {status.status.rankcount.sp} (BO {status.status.rankcount.spb})</TextCommon>
                <TextCommon>S: {status.status.rankcount.s} (BO {status.status.rankcount.sb})</TextCommon>
                <TextCommon>AAA+: {status.status.rankcount.aaap} (BO {status.status.rankcount.aaapb})</TextCommon>
                <TextCommon>AAA: {status.status.rankcount.aaa} (BO {status.status.rankcount.aaab})</TextCommon>
                <TextCommon>AA+: {status.status.rankcount.aap} (BO {status.status.rankcount.aapb})</TextCommon>
                <TextCommon>AA: {status.status.rankcount.aa} (BO {status.status.rankcount.aab})</TextCommon>
                <TextCommon>A+: {status.status.rankcount.ap} (BO {status.status.rankcount.apb})</TextCommon>
                <TextCommon>A: {status.status.rankcount.a} (BO {status.status.rankcount.ab})</TextCommon>
                <TextCommon>B: {status.status.rankcount.b} (BO {status.status.rankcount.bb})</TextCommon>
                <TextCommon>C: {status.status.rankcount.c} (BO {status.status.rankcount.cb})</TextCommon>
                <TextCommon>D: {status.status.rankcount.d} (BO {status.status.rankcount.db})</TextCommon>
                <TextCommon>F: {status.status.rankcount.f} (BO {status.status.rankcount.fb})</TextCommon>
            </ScoreTableUserInfo>

            {table.table.over.data.length > 0 && (
                <DataWrapper bgColor={"#ffadc5"} id="divOver">
                    <DataTitle id="catOver">{table.table.over.title}</DataTitle>
                    <DataInner id="lvOver">
                        <PIUTableObj
                            list={table.table.over.data}
                            keyv="ov"
                            showrank={status.status.showTableRank}
                            showcheck={status.status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {table.table.high.data.length > 0 && (
                <DataWrapper bgColor={"#ffa9b0"} id="divHigh">
                    <DataTitle id="catHigh">{table.table.high.title}</DataTitle>
                    <DataInner id="lvHigh">
                        <PIUTableObj
                            list={table.table.high.data}
                            keyv="hi"
                            showrank={status.status.showTableRank}
                            showcheck={status.status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {table.table.normalhigh.data.length > 0 && (
                <DataWrapper bgColor={"#ffdda6"} id="divNH">
                    <DataTitle id="catNH">{table.table.normalhigh.title}</DataTitle>
                    <DataInner id="lvNH">
                        <PIUTableObj
                            list={table.table.normalhigh.data}
                            keyv="nh"
                            showrank={status.status.showTableRank}
                            showcheck={status.status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {table.table.normal.data.length > 0 && (
                <DataWrapper bgColor={"#f8e5d0"} id="divNormal">
                    <DataTitle id="catNormal">{table.table.normal.title}</DataTitle>
                    <DataInner id="lvNormal">
                        <PIUTableObj
                            list={table.table.normal.data}
                            keyv="nr"
                            showrank={status.status.showTableRank}
                            showcheck={status.status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {table.table.normaleasy.data.length > 0 && (
                <DataWrapper bgColor={"#a9e2c5"} id="divNE">
                    <DataTitle id="catNE">{table.table.normaleasy.title}</DataTitle>
                    <DataInner id="lvNE">
                        <PIUTableObj
                            list={table.table.normaleasy.data}
                            keyv="ne"
                            showrank={status.status.showTableRank}
                            showcheck={status.status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {table.table.easy.data.length > 0 && (
                <DataWrapper bgColor={"#bbd1e8"} id="divEasy">
                    <DataTitle id="catEasy">{table.table.easy.title}</DataTitle>
                    <DataInner id="lvEasy">
                        <PIUTableObj
                            list={table.table.easy.data}
                            keyv="ez"
                            showrank={status.status.showTableRank}
                            showcheck={status.status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {table.table.below.data.length > 0 && (
                <DataWrapper bgColor={"#c6d6f7"} id="divBelow">
                    <DataTitle id="catBelow">{table.table.below.title}</DataTitle>
                    <DataInner id="lvBelow">
                        <PIUTableObj
                            list={table.table.below.data}
                            keyv="be"
                            showrank={status.status.showTableRank}
                            showcheck={status.status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}

            {table.table.random.data.length > 0 && (
                <DataWrapper bgColor={"#ab95d4"} id="divRandom">
                    <DataTitle id="catRandom">{table.table.random.title}</DataTitle>
                    <DataInner id="lvRandom">
                        <PIUTableObj
                            list={table.table.random.data}
                            keyv="rd"
                            showrank={status.status.showTableRank}
                            showcheck={status.status.showTableCheck}
                        />
                    </DataInner>
                </DataWrapper>
            )}
        </ScoreTableWrapper>
    );
});

export default TableWrapper;
