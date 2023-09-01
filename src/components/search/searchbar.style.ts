import styled from "styled-components";
import { ButtonEmpty } from "../../styled/common.style";

export const SearchBarWrapper = styled.div`
    width: 100%;
    max-width: 1280px;
`;

export const SearchBarElem = styled.input`
    height: 40px;
    width: 100%;
    max-width: 1280px;
    border-radius: 15px;
    padding: 5px;

    position: relative;
`;

export const SearchButton = styled(ButtonEmpty)`
    position: fixed;
    right: 10px;
`;
