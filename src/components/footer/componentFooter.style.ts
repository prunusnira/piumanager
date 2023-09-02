import styled from "styled-components";
import { TitleBlack } from "../../styled/common.color";

export const FooterWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;

    width: 100%;
    max-width: 1280px;
    background-color: ${TitleBlack};

    padding: 10px;
    font-size: 12px;
`;

export const FooterRow = styled.div`
    width: 100%;
`;
