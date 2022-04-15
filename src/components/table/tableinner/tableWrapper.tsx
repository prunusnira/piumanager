import React from "react";
import { faImages, faShareAltSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { unixTimeToText } from "../tool";
import PIUTableObj from "../tableobj/piuTableObj";
import IntegratedStore from "../../../mobx/integratedStore";
import { observer } from "mobx-react";
import { PatternType } from "../data/patternType";
import {
    DataInner,
    DataTitle,
    DataWrapper,
    ScoreTableLv,
    ScoreTableTitle,
    ScoreTableTitleMenu,
    ScoreTableUserInfo,
    ScoreTableWrapper,
    UserInfoDivide,
} from "./tableWrapper.style";
import { Button } from "../../../styled/common.style";

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
                <h5>
                    {status.status.patternType === PatternType.SINGLE
                        ? "Single"
                        : status.status.patternType === PatternType.DOUBLE
                        ? "Double"
                        : "CO-OP"}
                    &nbsp; Lv.{status.status.patternLv} Clear Table
                </h5>
            </ScoreTableLv>
            <ScoreTableUserInfo>
                <UserInfoDivide>
                    <div>
                        <b>
                            <span>PLAYER NAME</span>
                        </b>
                        &nbsp;
                        <span data-testid="txtPlayerName">{user.user.userName}</span>
                    </div>
                    <div>
                        <b>
                            <span>PLAYER LEVEL</span>
                        </b>
                        &nbsp;
                        <span>{user.user.userLv}</span>
                    </div>
                </UserInfoDivide>
                <UserInfoDivide>
                    <div>
                        {`SSS: ${status.status.rankcount.sss} | SS: ${status.status.rankcount.ss} | S: ${status.status.rankcount.s} | A: ${status.status.rankcount.aon} | BCD: ${status.status.rankcount.bcdon}`}
                    </div>
                    <div>
                        {`A: ${status.status.rankcount.aoff} (Off) | BCD: ${status.status.rankcount.bcdoff} (Off) | F: ${status.status.rankcount.f} | No Play: ${status.status.rankcount.np}`}
                    </div>
                </UserInfoDivide>
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
