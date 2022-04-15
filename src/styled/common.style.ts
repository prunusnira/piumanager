import styled from "styled-components";
import { ButtonLeft, ButtonRight } from "./color";

export const Anchor = styled.a``;

export const ButtonEmpty = styled.button`
    background-color: transparent;
    border: none;

    color: rgb(16, 50, 90);
    font-size: 80%;
    font-weight: bold;
    line-height: 1.5em;
    height: 3em;
    overflow: hidden;
`;

export const Button = styled.button`
    background: linear-gradient(to right, ${ButtonLeft}, ${ButtonRight});
    padding: 10px;
    border: none;
    margin: 1px;
    color: white;
    width: 100%;
`;
