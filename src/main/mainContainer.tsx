import React, { useState } from 'react';
import Language from '../table/data/language';
import Main from './main';
import './piuCustom.css';
import { Card, Container } from 'reactstrap';
import Footer from '../footer/footer';
import Header from '../header/header';

const MainContainer = () => {
    const [mode, setPageMode] = useState(0); // 0: 테이블, 1: 검색
    
    const lang = new Language().getLang();
    return (
        <Container fluid>
            <Card>
                <Header
                    lang={lang}
                    mode={mode}
                    setPageMode={setPageMode} />
                <Main
                    lang={lang}
                    mode={mode} />
                <Footer lang={lang} />
            </Card>
        </Container>
    );
}

export default MainContainer;