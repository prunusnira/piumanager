import styled from "styled-components";
import { CheckBGColor, TitleBlack } from "../../../styled/common.color";

export const TableMenuWrapper = styled.div<{ display: boolean }>`
    ${(props) => (props.display ? `display: flex;` : `display: none;`)}
    flex-direction: column;
    width: 100%;
    max-width: 1280px;
`;

export const TableMenuTitle = styled.div`
    background-color: ${TitleBlack};
    padding: 10px;
`;

export const TableMenuPatternWrapper = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }

    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 1280px;
`;

export const TableMenuPattern = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
  
  padding: 20px;
`;

export const TableMenuSubWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const TableMenuSubTitle = styled.div``;

export const TableMenuDiff = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 130px;
`;

export const TableMenuSelect = styled.select`
    width: 130px;
    height: 40px;
    border-radius: 10px;
`;

export const TableInputCheck = styled.input`
    width: 25px;
    height: 25px;
    margin-right: 5px;

    accent-color: ${CheckBGColor};
`;

export const TableInputLabel = styled.label`
    margin-bottom: 0;
`;
