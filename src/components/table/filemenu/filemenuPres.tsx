import React from "react";
import { observer } from "mobx-react";

import TxtFileMenuKo from "../../../text/table/filemenu/txtFilemenu-ko";
import TxtFileMenuJp from "../../../text/table/filemenu/txtFilemenu-jp";
import TxtFileMenuCn from "../../../text/table/filemenu/txtFilemenu-cn";
import TxtFileMenuEn from "../../../text/table/filemenu/txtFilemenu-en";
import IntegratedStore from "../../../mobx/integratedStore";
import { FileMenuButton, FileMenuHowTo, FileMenuWrapper } from "./filemenu.style";
import { Button } from "../../../styled/common.style";

type FilemenuPresProps = {
    checkUserBeforeNew: () => void;
    checkUserBeforeLoad: () => void;
    checkUserBeforeSave: () => void;
};

const FilemenuPres = observer((props: FilemenuPresProps) => {
    const { language, status } = IntegratedStore;

    const TxtFileMenu =
        language.language === "ko"
            ? TxtFileMenuKo
            : language.language === "jp"
            ? TxtFileMenuJp
            : language.language === "cn"
            ? TxtFileMenuCn
            : TxtFileMenuEn;

    if (status.status.isShareData) {
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
                    <Button color="secondary" onClick={props.checkUserBeforeNew}>
                        {TxtFileMenu.newuser}
                    </Button>
                    <Button color="secondary" onClick={props.checkUserBeforeLoad}>
                        {TxtFileMenu.load}
                    </Button>
                    <Button color="secondary" onClick={props.checkUserBeforeSave}>
                        {TxtFileMenu.save}
                    </Button>
                </FileMenuButton>
            </FileMenuWrapper>
        );
    }
});

export default FilemenuPres;
