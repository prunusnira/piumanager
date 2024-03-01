import React, {useRef} from "react";
import { observer } from "mobx-react";
import TxtFileMenuKo from "../../../text/table/filemenu/txtFilemenu-ko";
import TxtFileMenuJp from "../../../text/table/filemenu/txtFilemenu-jp";
import TxtFileMenuCn from "../../../text/table/filemenu/txtFilemenu-cn";
import TxtFileMenuEn from "../../../text/table/filemenu/txtFilemenu-en";
import { FileMenuButton, FileMenuHowTo, FileMenuWrapper } from "./componentFileMenu.style";
import { Button } from "../../../styled/common.style";
import useFileMenu from "../../../hooks/useFileMenu";
import DialogUserEdit from "../../../dialog/dialogUserEdit";
import DialogUserReset from "../../../dialog/dialogUserReset";
import useResetModal from "../../../hooks/useResetModal";
import {useRecoilValue} from "recoil";
import {atomLanguage} from "../../../recoil/language";
import {atomStatus} from "../../../recoil/status";

const ComponentFileMenu = observer(() => {
    const language = useRecoilValue(atomLanguage)
    const status = useRecoilValue(atomStatus)
    const fileOpenRef = useRef<HTMLInputElement>(null);
    const {
        checkUserBeforeNew,
        checkUserBeforeLoad,
        checkUserBeforeSave,
        setAllowUserNew,
        setAllowUserLoad,
    } = useFileMenu(fileOpenRef);

    const {runUserReset} = useResetModal(
        setAllowUserNew,
        setAllowUserLoad
    );

    const TxtFileMenu =
        language === "ko"
            ? TxtFileMenuKo
            : language === "jp"
            ? TxtFileMenuJp
            : language === "cn"
            ? TxtFileMenuCn
            : TxtFileMenuEn;

    if (status.isShareData) {
        return (
            <div>
                <h4>{TxtFileMenu.sharedata}</h4>
            </div>
        );
    } else {
        return (
            <FileMenuWrapper>
                <FileMenuHowTo>
                    {TxtFileMenu.howto1}
                    <br />
                    <ol>
                        <li>{TxtFileMenu.howto2}</li>
                        <li>{TxtFileMenu.howto3}</li>
                        <li>{TxtFileMenu.howto4}</li>
                    </ol>
                </FileMenuHowTo>

                <FileMenuButton>
                    <Button color="secondary" onClick={checkUserBeforeNew}>
                        {TxtFileMenu.newuser}
                    </Button>
                    <Button color="secondary" onClick={checkUserBeforeLoad}>
                        {TxtFileMenu.load}
                    </Button>
                    <Button color="secondary" onClick={checkUserBeforeSave}>
                        {TxtFileMenu.save}
                    </Button>
                </FileMenuButton>

                <input
                    id="fileopen"
                    accept=".csv"
                    type="file"
                    name="fileopen"
                    style={{ display: "none" }}
                    ref={fileOpenRef}
                />

                <DialogUserReset runUserReset={runUserReset} />
                <DialogUserEdit setAllowUserNew={setAllowUserNew} />
            </FileMenuWrapper>
        );
    }
});

export default ComponentFileMenu;
