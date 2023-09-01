import React, {useState} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Row, Col} from "reactstrap";
import {useEffect} from "react";
import {observer} from "mobx-react";
import {RankType} from "../../../data/rankType";
import IntegratedStore from "../../../mobx/integratedStore";
import {PatternDlgType} from "../../../data/patternDlgType";
import {PatternType} from "../../../data/patternType";

import TxtPatternDlgKo from "../../../text/table/patternDlg/txtPatternDlg-ko";
import TxtPatternDlgJp from "../../../text/table/patternDlg/txtPatternDlg-jp";
import TxtPatternDlgCn from "../../../text/table/patternDlg/txtPatternDlg-cn";
import TxtPatternDlgEn from "../../../text/table/patternDlg/txtPatternDlg-en";
import {textToRank} from "../../../data/rankTextConvert";
import {Button} from "../../../styled/common.style";
import {TableInputCheck, TableInputLabel} from "../tablemenu/tableMenu.style";

interface Props {
    updateData: (ptid: number, rank: RankType, breakOff: boolean) => void;
    updateMultipleData: (rank: RankType, breakOff: boolean) => void;
    closeUpdatePatternDlg: () => void;
    rankCountReset: () => void;
    updateRankCount: () => void;
}

const PTUpdateDlgPres = observer((props: Props) => {
    const {status, language} = IntegratedStore;

    const TxtPatternDlg =
        language.language === "ko"
            ? TxtPatternDlgKo
            : language.language === "jp"
                ? TxtPatternDlgJp
                : language.language === "cn"
                    ? TxtPatternDlgCn
                    : TxtPatternDlgEn;

    const [dlgTitle, setDlgTitle] = useState("");
    const [musicTitle, setMusicTitle] = useState("");
    const [rank, setRank] = useState("-");
    const [isBreakOff, setBreakOff] = useState(false);

    useEffect(() => {
        if (status.status.patternUpdDlgType === PatternDlgType.SINGLE) {
            setDlgTitle(TxtPatternDlg.patternUpdDlgTitle);
            setMusicTitle(status.status.selectedMusicTitle);
        } else {
            setDlgTitle(TxtPatternDlg.patternAllUpdDlgTitle);
            setMusicTitle(TxtPatternDlg.patternAllUpdDlgTitle);
        }
    }, [status.status.showPtUpdDlg, status.status.patternUpdDlgType]);

    useEffect(() => {
        status.setUpdateRank(textToRank(rank));
    }, [rank]);

    return (
        <Modal isOpen={status.status.showPtUpdDlg}>
            <ModalHeader>{dlgTitle}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="12">
                        {musicTitle}
                        <br/>
                        {status.status.patternType === PatternType.SINGLE
                            ? "Single"
                            : status.status.patternType === PatternType.DOUBLE
                                ? "Double"
                                : "CO-OP"}
                        &nbsp;
                        {status.status.patternLv}
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="12" className="form-group">
                        <label htmlFor="grade">Select rank:</label>
                        <select
                            className="form-control"
                            id="grade"
                            onChange={(e) => {
                                if(e.currentTarget.value !== '-') {
                                    setRank(e.currentTarget.value);
                                }
                            }}
                            value={rank}
                        >
                            <option value="-">Select</option>
                            <option value="9">SSS+</option>
                            <option value="10">SSS</option>
                            <option value="11">SS+</option>
                            <option value="12">SS</option>
                            <option value="13">S+</option>
                            <option value="14">S</option>
                            <option value="15">AAA+</option>
                            <option value="16">AAA</option>
                            <option value="17">AA+</option>
                            <option value="18">AA</option>
                            <option value="19">A+</option>
                            <option value="20">A</option>
                            <option value={"21"}>B</option>
                            <option value={"22"}>C</option>
                            <option value={"23"}>D</option>
                            <option value={"24"}>F</option>
                            <option value="7">No Play</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="form-group">
                        <label htmlFor="grade">Select rank (Before PHOENIX):</label>
                        <select
                            className="form-control"
                            id="grade"
                            onChange={(e) => {
                                if(e.currentTarget.value !== '-') {
                                    setRank(e.currentTarget.value);
                                }
                            }}
                            value={rank}
                        >
                            <option value="-">Select</option>
                            <option value="0">SSS</option>
                            <option value="1">SS</option>
                            <option value="2">S</option>
                            <option value="3">A (Break On)</option>
                            <option value="4">A (Break Off)</option>
                            <option value="8">BCD (Break On)</option>
                            <option value="5">BCD (Break Off)</option>
                            <option value="6">F or GameOver</option>
                            <option value="7">No Play</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <TableInputCheck
                            id="breakoff"
                            type="checkbox"
                            value="breakoff"
                            onChange={() => {
                                setBreakOff(!isBreakOff);
                            }}
                            checked={isBreakOff}
                        />
                        <TableInputLabel htmlFor="musfull">BreakOff</TableInputLabel>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    onClick={() => {
                        if (status.status.patternUpdDlgType === PatternDlgType.SINGLE) {
                            props.updateData(
                                status.status.selectedPatternId,
                                status.status.updateRank,
                                isBreakOff
                            );
                            status.status.selectedPatternId = 0;
                        } else {
                            props.updateMultipleData(status.status.updateRank, isBreakOff);
                        }
                        props.rankCountReset();
                        props.updateRankCount();
                    }}
                >
                    {TxtPatternDlg.update}
                </Button>
                <Button color="secondary" onClick={() => props.closeUpdatePatternDlg()}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
});

export default PTUpdateDlgPres;
