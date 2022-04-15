import React from "react";
import IntegratedStore from "../../mobx/integratedStore";
import { observer } from "mobx-react";

import TxtHeaderKo from "../../text/header/txtHeader-ko";
import TxtHeaderJp from "../../text/header/txtHeader-jp";
import TxtHeaderEn from "../../text/header/txtHeader-en";
import TxtHeaderCn from "../../text/header/txtHeader-cn";
import { HeaderRow, HeaderWrapper } from "./headerPres.style";
import { Button } from "../../styled/common.style";

type HeaderProps = {
    changeModeAlert: (t: number) => void;
};

const HeaderPres = observer((props: HeaderProps) => {
    const { language } = IntegratedStore;

    const TxtHeader =
        language.language === "ko"
            ? TxtHeaderKo
            : language.language === "jp"
            ? TxtHeaderJp
            : language.language === "cn"
            ? TxtHeaderCn
            : TxtHeaderEn;

    return (
        <HeaderWrapper>
            <HeaderRow>
                <img
                    alt="logo"
                    src={`${process.env.PUBLIC_URL}/logo192.png`}
                    style={{ width: "40px", height: "40px" }}
                />
                &nbsp;
                <span style={{ fontSize: "150%" }}>Pump It Up</span>
                &nbsp;
                <span>{TxtHeader.subtitle}</span>
            </HeaderRow>
            <HeaderRow>
                <Button onClick={() => props.changeModeAlert(0)}>{TxtHeader.btnMode}</Button>
                <Button onClick={() => props.changeModeAlert(1)}>{TxtHeader.btnSearch}</Button>
            </HeaderRow>
        </HeaderWrapper>
    );
});

export default HeaderPres;
