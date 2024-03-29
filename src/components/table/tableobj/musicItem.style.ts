import styled from "styled-components";

export const ObjWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1px;
    width: 100px;
`;

export const SongType = styled.span`
    height: 0;
`;

export const CheckBoxWrapper = styled.div`
    width: 100%;
`;

export const CheckBox = styled.input<{ display: boolean }>`
    width: 20px;
    height: 20px;

    display: ${(props) => (props.display ? "inline" : "none")};
`;

export const JacketWrapper = styled.div``;

export const NameWrapper = styled.div`
    width: 100%;
`;
