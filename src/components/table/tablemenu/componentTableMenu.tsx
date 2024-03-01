import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import {PatternType} from "../../../data/patternType";
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
import {TextTableTitle, TextTitleSub} from "../../../styled/common.font";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {atomLanguage} from "../../../recoil/language";
import {atomPaternUpdateDialog, atomStatus, atomUserDialog} from "../../../recoil/status";

const ComponentTableMenu = observer(() => {
    const language = useRecoilValue(atomLanguage);
    const [status, setStatus] = useRecoilState(atomStatus);
    const setShowUserDialog = useSetRecoilState(atomUserDialog);
    const setPatternUpdateDialog = useSetRecoilState(atomPaternUpdateDialog);
    const {
        selDiffSingle,
        selDiffDouble,
        selDiffCoop,
        diffSelReset,
    } = useTableMenu();
    const {getPatterns} = useTableData();

    useEffect(() => {
        getPatterns();
        diffSelReset();
    }, [status.patternLv, status.patternType]);

    const TxtTableMenu =
        language === "ko"
            ? TxtTableMenuKo
            : language === "jp"
                ? TxtTableMenuJp
                : language === "cn"
                    ? TxtTableMenuCn
                    : TxtTableMenuEn;

    return (
        <TableMenuWrapper display={status.isUserLoaded}>
            <TableMenuTitle>
                <TextTableTitle>{TxtTableMenu.menu}</TextTableTitle>
            </TableMenuTitle>
            <TableMenuPatternWrapper>
                <TableMenuPattern>
                    <TableMenuSubTitle>
                        <TextTitleSub>{TxtTableMenu.patternsel}</TextTitleSub>
                    </TableMenuSubTitle>
                    <TableMenuSubWrapper>
                        <TableMenuDiff>
                            SINGLE
                            <TableMenuSelect
                                ref={selDiffSingle}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "--") {
                                        setStatus({
                                            ...status,
                                            patternType: PatternType.SINGLE,
                                            patternLv: parseInt(e.currentTarget.value),
                                        })
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
                                <option value="25">25</option>
                                <option value="26">26</option>
                            </TableMenuSelect>
                        </TableMenuDiff>
                        <TableMenuDiff>
                            DOUBLE
                            <TableMenuSelect
                                ref={selDiffDouble}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "--") {
                                        setStatus({
                                            ...status,
                                            patternType: PatternType.DOUBLE,
                                            patternLv: parseInt(e.currentTarget.value),
                                        })
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
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                            </TableMenuSelect>
                        </TableMenuDiff>
                        <TableMenuDiff>
                            CO-OP
                            <TableMenuSelect
                                ref={selDiffCoop}
                                onChange={(e) => {
                                    if (e.currentTarget.value !== "--") {
                                        setStatus({
                                            ...status,
                                            patternType: PatternType.COOP,
                                            patternLv: parseInt(e.currentTarget.value),
                                        })
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
                                setStatus({
                                    ...status,
                                    userDlgType: UserDlgType.EDITUSER
                                })
                                setShowUserDialog(true);
                            }}
                        >
                            {TxtTableMenu.edit}
                        </Button>
                        <Button
                            color="secondary"
                            style={{width: "50%"}}
                            onClick={() => {
                                setStatus({
                                    ...status,
                                    patternUpdDlgType: PatternDlgType.MULTIPLE,
                                })
                                setPatternUpdateDialog(true);
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
                                setStatus({
                                    ...status,
                                    showTableCheck: !status.showTableCheck
                                })
                            }}
                        >
                            <FontAwesomeIcon icon={faCheckSquare}/>
                            {TxtTableMenu.display}
                        </Button>
                        <Button
                            color="secondary"
                            style={{width: "50%"}}
                            onClick={() => {
                                setStatus({
                                    ...status,
                                    showTableRank: !status.showTableRank
                                })
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
                                    setStatus({
                                        ...status,
                                        showArcade: !status.showArcade,
                                    })
                                }}
                                checked={status.showArcade}
                            />
                            <TableInputLabel htmlFor="musarcade">Arcade</TableInputLabel>
                        </TableMenuSubWrapper>

                        <TableMenuSubWrapper>
                            <TableInputCheck
                                id="musshort"
                                type="checkbox"
                                value="musshort"
                                onChange={() => {
                                    setStatus({
                                        ...status,
                                        showShort: !status.showShort,
                                    })
                                }}
                                checked={status.showShort}
                            />
                            <TableInputLabel htmlFor="musshort">Shortcut</TableInputLabel>
                        </TableMenuSubWrapper>

                        <TableMenuSubWrapper>
                            <TableInputCheck
                                id="musfull"
                                type="checkbox"
                                value="musfull"
                                onChange={() => {
                                    setStatus({
                                        ...status,
                                        showFull: !status.showFull,
                                    })
                                }}
                                checked={status.showFull}
                            />
                            <TableInputLabel htmlFor="musfull">Fullsong</TableInputLabel>
                        </TableMenuSubWrapper>

                        <TableMenuSubWrapper>
                            <TableInputCheck
                                id="musremix"
                                type="checkbox"
                                value="musremix"
                                onChange={() => {
                                    setStatus({
                                        ...status,
                                        showRemix: !status.showRemix
                                    })
                                }}
                                checked={status.showRemix}
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
                                    setStatus({
                                        ...status,
                                        showRemovedPattern: !status.showRemovedPattern
                                    })
                                }}
                                checked={status.showRemovedPattern}
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
