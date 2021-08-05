import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { observer } from "mobx-react"

import TxtHeaderKo from "../../text/header/txtHeader-ko"
import TxtHeaderJp from "../../text/header/txtHeader-jp"
import TxtHeaderEn from "../../text/header/txtHeader-en"
import TxtHeaderCn from "../../text/header/txtHeader-cn"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import IntegratedStore from "../../mobx/integratedStore"

type HModalProps = {
    modeAlert: boolean,
    executeChange: () => void,
    closeDialog: () => void,
}

const HeaderModal = observer((props: HModalProps) => {
    const {language} = IntegratedStore

    const TxtHeader =
        language.language === 'ko' ? TxtHeaderKo :
        language.language === 'jp' ? TxtHeaderJp :
        language.language === 'cn' ? TxtHeaderCn : TxtHeaderEn

    return (
        <Modal isOpen={props.modeAlert}>
            <ModalHeader>
                <FontAwesomeIcon icon={faExclamationCircle} />
                &nbsp;
                {TxtHeader.modeChange.title}
            </ModalHeader>
            <ModalBody>
                {TxtHeader.modeChange.body}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={props.closeDialog}>
                    Cancel
                </Button>
                <Button
                    onClick={props.executeChange}>
                    OK
                </Button>
            </ModalFooter>
        </Modal>
    )
})

export default HeaderModal