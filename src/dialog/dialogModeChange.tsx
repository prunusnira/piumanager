import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {observer} from "mobx-react";
import TxtHeaderKo from "../text/header/txtHeader-ko";
import TxtHeaderJp from "../text/header/txtHeader-jp";
import TxtHeaderEn from "../text/header/txtHeader-en";
import TxtHeaderCn from "../text/header/txtHeader-cn";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {Button} from "../styled/common.style";
import {atomLanguage} from "../recoil/language";
import {useRecoilValue} from "recoil";

type HModalProps = {
    modeAlert: boolean;
    executeChange: () => void;
    closeDialog: () => void;
};

const DialogModeChange = observer((props: HModalProps) => {
    const language = useRecoilValue(atomLanguage);

    const TxtHeader =
        language === "ko"
            ? TxtHeaderKo
            : language === "jp"
                ? TxtHeaderJp
                : language === "cn"
                    ? TxtHeaderCn
                    : TxtHeaderEn;

    return (
        <Modal isOpen={props.modeAlert}>
            <ModalHeader>
                <FontAwesomeIcon icon={faExclamationCircle}/>
                &nbsp;
                {TxtHeader.modeChange.title}
            </ModalHeader>
            <ModalBody>{TxtHeader.modeChange.body}</ModalBody>
            <ModalFooter>
                <Button onClick={props.executeChange}>OK</Button>
                <Button onClick={props.closeDialog}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
});

export default DialogModeChange;
