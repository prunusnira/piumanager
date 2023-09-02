import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import {PatternType} from "../../../data/patternType";
import Store from "../../../mobx/store";
import {UserDlgType} from "../../../data/userDlgType";
import {observer} from "mobx-react";
import {PatternDlgType} from "../../../data/patternDlgType";

import TxtTableMenuKo from "../../../text/table/tablemenu/txtTablemenu-ko";
import TxtTableMenuJp from "../../../text/table/tablemenu/txtTablemenu-jp";
import TxtTableMenuCn from "../../../text/table/tablemenu/txtTablemenu-cn";
import TxtTableMenuEn from "../../../text/table/tablemenu/txtTablemenu-en";
import {
    TableInputCheck,
    TableInputLabel,
    TableMenuDiff,
    TableMenuPattern,
    TableMenuPatternWrapper,
    TableMenuSelect,
    TableMenuSubTitle,
    TableMenuSubWrapper,
    TableMenuTitle,
    TableMenuWrapper,
} from "./componentTableMenu.style";
import {Button} from "../../../styled/common.style";
import useTableMenu from "../../../hooks/useTableMenu";
import useTableData from "../../../hooks/useTableData";

const ComponentTableMenu = observer(() => {
    const {language, status} = Store;
    const {selDiffSingle, selDiffDouble, selDiffCoop, diffSelReset} = useTableMenu();
    const {getPatterns} = useTableData();

    useEffect(() => {
        getPatterns();
        diffSelReset();
    }, [status.status.patternLv, status.status.patternType]);

    const TxtTableMenu =
        language.language === "ko"
            ? TxtTableMenuKo
            : language.language === "jp"
                ? TxtTableMenuJp
                : language.language === "cn"
                    ? TxtTableMenuCn
                    : TxtTableMenuEn;

    return (
        <TableMenuWrapper display={status.status.isUserLoaded}>
            <TableMenuTitle>
                <h4>{TxtTableMenu.menu}</h4>
            </TableMenuTitle>
            <TableMenuPatternWrapper>
                <TableMenuPattern>
                    <TableMenuSubTitle>
                        <h5>{TxtTableMenu.patternsel}</h5>
                    </TableMenuSubTitle>
                    <TableMenuSubWrapper>
                        <TableMenuDiff>
                            SINGLE
                            <TableMenuSelect
                                ref={selDiffSingle}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "--") {
                                        status.setPatternType(PatternType.SINGLE);
                                        status.setPatternLv(parseInt(e.currentTarget.value));
                                    }
                                }}
                            >
                                <option value="--">SELECT</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24+</option>
                            </TableMenuSelect>
                        </TableMenuDiff>
                        <TableMenuDiff>
                            DOUBLE
                            <TableMenuSelect
                                ref={selDiffDouble}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "--") {
                                        status.setPatternType(PatternType.DOUBLE);
                                        status.setPatternLv(parseInt(e.currentTarget.value));
                                    }
                                }}
                            >
                                <option value="--">SELECT</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25+</option>
                            </TableMenuSelect>
                        </TableMenuDiff>
                        <TableMenuDiff>
                            CO-OP
                            <TableMenuSelect
                                ref={selDiffCoop}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "--") {
                                        status.setPatternType(PatternType.COOP);
                                        status.setPatternLv(parseInt(e.currentTarget.value));
                                    }
                                }}
                            >
                                <option value="--">SELECT</option>
                                <option value="2">x2</option>
                                <option value="3">x3</option>
                                <option value="4">x4</option>
                                <option value="5">x5+</option>
                            </TableMenuSelect>
                        </TableMenuDiff>
                    </TableMenuSubWrapper>
                </TableMenuPattern>

                <TableMenuPattern>
                    <TableMenuSubWrapper>
                        <Button
                            color="secondary"
                            style={{width: "50%"}}
                            onClick={() => {
                                status.setShowUserDialog(true);
                                status.setUserDlgType(UserDlgType.EDITUSER);
                            }}
                        >
                            {TxtTableMenu.edit}
                        </Button>
                        <Button
                            color="secondary"
                            style={{width: "50%"}}
                            onClick={() => {
                                status.status.showPtUpdDlg = true;
                                status.status.patternUpdDlgType = PatternDlgType.MULTIPLE;
                            }}
                        >
                            <FontAwesomeIcon icon={faCheckSquare}/>
                            {TxtTableMenu.updatecheckedbtn}
                        </Button>
                    </TableMenuSubWrapper>
                    <TableMenuSubWrapper>
                        <Button
                            color="secondary"
                            style={{width: "50%"}}
                            onClick={() => {
                                status.status.showTableCheck = !status.status.showTableCheck;
                            }}
                        >
                            <FontAwesomeIcon icon={faCheckSquare}/>
                            {TxtTableMenu.display}
                        </Button>
                        <Button
                            color="secondary"
                            style={{width: "50%"}}
                            onClick={() => {
                                status.status.showTableRank = !status.status.showTableRank;
                            }}
                        >
                            {TxtTableMenu.rank}
                            &nbsp;
                            {TxtTableMenu.display}
                        </Button>
                    </TableMenuSubWrapper>
                </TableMenuPattern>
            </TableMenuPatternWrapper>
            <TableMenuPatternWrapper>
                <TableMenuPattern>
                    <TableMenuSubTitle>
                        <h5>{TxtTableMenu.songtype}</h5>
                    </TableMenuSubTitle>
                    <TableMenuSubWrapper>
                        <TableMenuSubWrapper>
                            <TableInputCheck
                                id="musarcade"
                                type="checkbox"
                                value="musarcade"
                                onChange={() => {
                                    status.setShowArcade(!status.status.showArcade);
                                }}
                                checked={status.status.showArcade}
                            />
                            <TableInputLabel htmlFor="musarcade">Arcade</TableInputLabel>
                        </TableMenuSubWrapper>

                        <TableMenuSubWrapper>
                            <TableInputCheck
                                id="musshort"
                                type="checkbox"
                                value="musshort"
                                onChange={() => {
                                    status.setShowShort(!status.status.showShort);
                                }}
                                checked={status.status.showShort}
                            />
                            <TableInputLabel htmlFor="musshort">Shortcut</TableInputLabel>
                        </TableMenuSubWrapper>

                        <TableMenuSubWrapper>
                            <TableInputCheck
                                id="musfull"
                                type="checkbox"
                                value="musfull"
                                onChange={() => {
                                    status.setShowFull(!status.status.showFull);
                                }}
                                checked={status.status.showFull}
                            />
                            <TableInputLabel htmlFor="musfull">Fullsong</TableInputLabel>
                        </TableMenuSubWrapper>

                        <TableMenuSubWrapper>
                            <TableInputCheck
                                id="musremix"
                                type="checkbox"
                                value="musremix"
                                onChange={() => {
                                    status.setShowRemix(!status.status.showRemix);
                                }}
                                checked={status.status.showRemix}
                            />
                            <TableInputLabel htmlFor="musremix">Remix</TableInputLabel>
                        </TableMenuSubWrapper>
                    </TableMenuSubWrapper>
                </TableMenuPattern>
                <TableMenuPattern>
                    <TableMenuSubTitle>
                        <h5>{TxtTableMenu.option}</h5>
                    </TableMenuSubTitle>
                    <TableMenuSubWrapper>
                        <TableMenuSubWrapper>
                            <TableInputCheck
                                id="withRemovedPattern"
                                type="checkbox"
                                value="withRemovedPattern"
                                onChange={() => {
                                    status.setShowRemoved(!status.status.showRemovedPattern);
                                }}
                                checked={status.status.showRemovedPattern}
                            />
                            <TableInputLabel
                                htmlFor="withRemovedPattern">{TxtTableMenu.withRemovedPattern}</TableInputLabel>
                        </TableMenuSubWrapper>
                    </TableMenuSubWrapper>
                </TableMenuPattern>
            </TableMenuPatternWrapper>
        </TableMenuWrapper>
    );
});

export default ComponentTableMenu;
