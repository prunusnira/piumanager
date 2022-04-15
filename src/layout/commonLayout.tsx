import React from "react";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import { Outer } from "./commonLayout.style";

type Props = {
    children: React.ReactNode;
    mode: number;
    setPageMode: (n: number) => void;
};

const CommonLayout = ({ children, mode, setPageMode }: Props) => {
    return (
        <Outer>
            <Header mode={mode} setPageMode={setPageMode} />
            {children}
            <Footer />
        </Outer>
    );
};

export default CommonLayout;
