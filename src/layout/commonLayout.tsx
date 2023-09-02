import React from "react";
import ComponentFooter from "../components/footer/componentFooter";
import ComponentHeader from "../components/header/componentHeader";
import { LayoutWrapper } from "./commonLayout.style";

type Props = {
    children: React.ReactNode;
    mode: number;
    setPageMode: (n: number) => void;
};

const CommonLayout = ({ children, mode, setPageMode }: Props) => {
    return (
        <LayoutWrapper>
            <ComponentHeader mode={mode} setPageMode={setPageMode} />
            {children}
            <ComponentFooter />
        </LayoutWrapper>
    );
};

export default CommonLayout;
