import React, { useState } from "react";
import CommonLayout from "../../layout/commonLayout";
import PageSearch from "../search/pageSearch";
import {MainWrapper} from "./pageMain.style";
import ComponentFileMenu from "../../components/table/filemenu/componentFileMenu";
import ComponentTableMenu from "../../components/table/tablemenu/componentTableMenu";
import ComponentPIUTable from "../../components/table/tableinner/componentPIUTable";
import DialogSaveAlert from "../../dialog/dialogSaveAlert";
import DialogPatternUpdate from "../../dialog/dialogPatternUpdate";
import DialogShare from "../../dialog/dialogShare";

const PageMain = () => {
    const [mode, setPageMode] = useState(0); // 0: 테이블, 1: 검색

    return (
        <CommonLayout mode={mode} setPageMode={setPageMode}>
            {mode === 0 && (
                <MainWrapper>
                    <ComponentFileMenu />
                    <ComponentTableMenu />
                    <ComponentPIUTable />

                    <DialogSaveAlert />
                    <DialogPatternUpdate />
                    <DialogShare />
                </MainWrapper>
            )}
            {mode === 1 && (
                <PageSearch />
            )}
        </CommonLayout>
    )
};

export default PageMain;
