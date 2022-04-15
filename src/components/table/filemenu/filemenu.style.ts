import styled from "styled-components";

export const FileMenuWrapper = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const FileMenuHowTo = styled.div`
    flex: 2;
`;

export const FileMenuButton = styled.div`
    flex: 1;
`;
