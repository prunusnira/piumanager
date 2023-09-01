import React, { useState } from "react";
import "./piuCustom.css";
import CommonLayout from "../../layout/commonLayout";
import Search from "../search/search";
import PIUTable from "../table/piuTable";

const Main = () => {
    const [mode, setPageMode] = useState(0); // 0: 테이블, 1: 검색

    switch (mode) {
        case 0:
            return (
                <CommonLayout mode={mode} setPageMode={setPageMode}>
                    <PIUTable />
                </CommonLayout>
            );
        case 1:
            return (
                <CommonLayout mode={mode} setPageMode={setPageMode}>
                    <Search />
                </CommonLayout>
            );
        default:
            return null;
    }
};

export default Main;
