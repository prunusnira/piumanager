import React, { useState } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col
} from 'reactstrap'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { RankType } from '../data/rankType'
import IntegratedStore from '../../../mobx/integratedStore'
import { PatternDlgType } from '../data/patternDlgType'
import { PatternType } from '../data/patternType'

import TxtPatternDlgKo from '../../../text/table/patternDlg/txtPatternDlg-ko'
import TxtPatternDlgJp from '../../../text/table/patternDlg/txtPatternDlg-jp'
import TxtPatternDlgCn from '../../../text/table/patternDlg/txtPatternDlg-cn'
import TxtPatternDlgEn from '../../../text/table/patternDlg/txtPatternDlg-en'
import { textToRank } from '../data/rankTextConvert'

interface Props {
    updateData: (ptid: number, rank: RankType) => void,
    updateMultipleData: (rank: RankType) => void,
    closeUpdatePatternDlg: () => void,
    rankCountReset: () => void,
    updateRankCount: () => void,
}

const PTUpdateDlgPres = observer((props: Props) => {
    const {status, language} = IntegratedStore

    const TxtPatternDlg =
        language.language === 'ko' ? TxtPatternDlgKo :
        language.language === 'jp' ? TxtPatternDlgJp :
        language.language === 'cn' ? TxtPatternDlgCn : TxtPatternDlgEn

    const [dlgTitle, setDlgTitle] = useState('')
    const [musicTitle, setMusicTitle] = useState('')
    const [rank, setRank] = useState('0')

    useEffect(() => {
        if(status.status.patternUpdDlgType === PatternDlgType.SINGLE) {
            setDlgTitle(TxtPatternDlg.patternUpdDlgTitle)
            setMusicTitle(status.status.selectedMusicTitle)
        }
        else {
            setDlgTitle(TxtPatternDlg.patternAllUpdDlgTitle)
            setMusicTitle(TxtPatternDlg.patternAllUpdDlgTitle)
        }
    }, [status.status.showPtUpdDlg, status.status.patternUpdDlgType])

    useEffect(() => {
        status.status.updateRank = textToRank(rank)
    }, [rank])

    return (
        <Modal isOpen={status.status.showPtUpdDlg}>
            <ModalHeader>
                {dlgTitle}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="12">
                        {musicTitle}
                        <br/>
                        {status.status.patternType === PatternType.SINGLE ? 'Single' :
                            status.status.patternType === PatternType.DOUBLE ? 'Double' :
                            'CO-OP'}
                        &nbsp;
                        {status.status.patternLv}
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="12" className="form-group">
                        <label htmlFor='grade'>Select rank:</label>
                        <select className='form-control'
                                id='grade'
                                onChange={(e) => {
                                    setRank(e.currentTarget.value)
                                }}
                                value={rank}>
                            <option value='0'>SSS</option>
                            <option value='1'>SS</option>
                            <option value='2'>S</option>
                            <option value='3'>A (Break On)</option>
                            <option value='4'>A (Break Off)</option>
                            <option value='8'>BCD (Break On)</option>
                            <option value='5'>BCD (Break Off)</option>
                            <option value='6'>F or GameOver</option>
                            <option value='7'>No Play</option>
                        </select>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" outlined="true" onClick={() => props.closeUpdatePatternDlg()}>
                    Close
                </Button>
                <Button color="secondary" outlined="true" onClick={() => {
                    if(status.status.patternUpdDlgType === PatternDlgType.SINGLE) {
                        props.updateData(status.status.selectedPatternId, status.status.updateRank)
                        status.status.selectedPatternId = 0
                    }
                    else {
                        props.updateMultipleData(status.status.updateRank)
                    }
                    props.rankCountReset()
                    props.updateRankCount()
                }}>
                    {TxtPatternDlg.update}
                </Button>
            </ModalFooter>
        </Modal>
    )
})

export default PTUpdateDlgPres