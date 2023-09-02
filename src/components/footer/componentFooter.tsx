import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

import TxtFooterKo from "../../text/footer/txtFooter-ko";
import TxtFooterJp from "../../text/footer/txtFooter-jp";
import TxtFooterCn from "../../text/footer/txtFooter-cn";
import TxtFooterEn from "../../text/footer/txtFooter-en";
import Store from "../../mobx/store";
import { useEffect } from "react";
import Language from "../../data/language";
import { FooterRow, FooterWrapper } from "./componentFooter.style";

const ComponentFooter = observer(() => {
    const { language } = Store;

    useEffect(() => {
        if (language.language === "") {
            language.setLanguage(new Language().getLang());
        }
    }, [language]);

    const astyle = {
        color: "#dddddd",
        textDecoration: "none",
    };

    const TxtFooter =
        language.language === "ko"
            ? TxtFooterKo
            : language.language === "jp"
            ? TxtFooterJp
            : language.language === "cn"
            ? TxtFooterCn
            : TxtFooterEn;

    return (
        <FooterWrapper>
            <FooterRow>Language Select:</FooterRow>
            <FooterRow>
                <Link to="#no_div" className="link-style1" onClick={() => language.setLanguage("ko")}>
                    한국어
                </Link>
                &nbsp;
                <Link to="#no_div" className="link-style1" onClick={() => language.setLanguage("jp")}>
                    日本語
                </Link>
                &nbsp;
                <Link to="#no_div" className="link-style1" onClick={() => language.setLanguage("cn")}>
                    中文简体
                </Link>
                &nbsp;
                <Link to="#no_div" className="link-style1" onClick={() => language.setLanguage("en")}>
                    English
                </Link>
            </FooterRow>
            <FooterRow>
                <span style={{ fontSize: "80%" }}>Simplified chinese translation by ZM-J</span>
            </FooterRow>

            <FooterRow>&nbsp;</FooterRow>

            <FooterRow>{TxtFooter.tableinfo}</FooterRow>

            <FooterRow>&nbsp;</FooterRow>

            <FooterRow>
                PIUManager (c) 2018 Nira (
                <a
                    style={astyle}
                    href="https://twitter.com/_nira_one"
                    target="_blink"
                    rel="noopener noreferrer"
                >
                    @_nira_one
                </a>
                ) / Source Code:&nbsp;
                <a
                    style={astyle}
                    href="https://github.com/prunusnira/piumanager"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </FooterRow>
            <FooterRow>Version PHOENIX 2.00: Sep. 1, 2023</FooterRow>
            <FooterRow>Version XX 1.4: Apr. 17, 2022</FooterRow>

            <FooterRow>&nbsp;</FooterRow>

            <FooterRow>{TxtFooter.fanpage}</FooterRow>
            <FooterRow>Developed with ReactJS, AWS Lambda & MariaDB, Hosted on AWS S3</FooterRow>
        </FooterWrapper>
    );
});

export default ComponentFooter;
