import React from "react";
import { CardHeader } from "reactstrap";
import txtPIU from "../piutable/txtpiu";
import styled from 'styled-components';

const Header: React.FC<{lang: string}> = ({ lang }) => {

    const Wrapper = styled.div`
        background-color: rgb(37, 37, 37) !important;
    `;

    return (
        <Wrapper>
            <CardHeader>
                <img
                    alt="logo"
                    src={process.env.PUBLIC_URL+"/logo192.png"}
                        style={{width: "40px", height: "40px"}} />
                &nbsp;
                <span style={{fontSize:"150%"}}>Pump It Up</span>
                &nbsp;
                <span>{(txtPIU.subtitle as any)[lang]}</span>
                <br/>
                <span>{(txtPIU.tableinfo as any)[lang]}</span>
            </CardHeader>
        </Wrapper>
    );
}

export default Header;