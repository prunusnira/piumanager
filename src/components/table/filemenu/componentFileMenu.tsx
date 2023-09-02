import React, {useEffect, useRef} from "react";
import { observer } from "mobx-react";

import TxtFileMenuKo from "../../../text/table/filemenu/txtFilemenu-ko";
import TxtFileMenuJp from "../../../text/table/filemenu/txtFilemenu-jp";
import TxtFileMenuCn from "../../../text/table/filemenu/txtFilemenu-cn";
import TxtFileMenuEn from "../../../text/table/filemenu/txtFilemenu-en";
import Store from "../../../mobx/store";
import { FileMenuButton, FileMenuHowTo, FileMenuWrapper } from "./componentFileMenu.style";
import { Button } from "../../../styled/common.style";
import useFileMenu from "../../../hooks/useFileMenu";
import {textToRank} from "../../../tools/rankTextConvert";
import axios from "axios";
import CommonData from "../../../data/commonData";
import DialogUserEdit from "../../../dialog/dialogUserEdit";
import DialogUserReset from "../../../dialog/dialogUserReset";
import useResetModal from "../../../hooks/useResetModal";
import useTableData from "../../../hooks/useTableData";

const ComponentFileMenu = observer(() => {
    const { language, status, user, table } = Store;
    const fileOpenRef = useRef<HTMLInputElement>(null);
    const [
        checkUserBeforeNew,
        checkUserBeforeLoad,
        checkUserBeforeSave,
        setAllowUserNew,
        setAllowUserLoad,

        // 분석데이터 - userDataAnalyze 파라미터
        analyzeData,
        analyzeType,
    ] = useFileMenu(fileOpenRef);

    const userLog = (name: string, type: string) => {
        axios.post(`${CommonData.dataUrl}userlog/${name}/${type}`);
    };

    const userDataAnalyze = (result: string, type: string) => {
        if (result !== "") {
            const str = result.split("\n");

            const userinfo = str[0].split(",");

            for (let i = 1; i < str.length; i++) {
                const cur = str[i].split(",");
                if (cur[0] !== "") {
                    if(cur.length === 2) {
                        user.user.userStatus.set(parseInt(cur[0]), {rank: textToRank(cur[1]), breakOff: false, lv: -1, side: -1});
                    }
                    else {
                        const json = JSON.parse(cur.join(','))
                        user.user.userStatus.set(json.ptid, {
                            rank: json.rank,
                            breakOff: json.breakOff,
                            lv: json.lv,
                            side: json.side,
                        });
                    }
                }
            }

            user.setUserName(userinfo[0]);
            status.setUserLoaded(true);
            userLog(userinfo[0], type);
            setAllowUserLoad(false);
        }
    };

    const {runUserReset} = useResetModal(
        setAllowUserNew,
        setAllowUserLoad
    );

    useEffect(() => {
        userDataAnalyze(analyzeData, analyzeType);
    }, [analyzeData]);

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
                <DialogUserEdit userLog={userLog} setAllowUserNew={setAllowUserNew} />
            </FileMenuWrapper>
        );
    }
});

export default ComponentFileMenu;
