import React, { useState } from 'react'
import Main from './main'
import './piuCustom.css'
import { Card, Container } from 'reactstrap'
import Footer from '../footer/footer'
import Header from '../header/header'

const MainContainer = () => {
    const [mode, setPageMode] = useState(0) // 0: 테이블, 1: 검색
    
    return (
        <Container fluid>
            <Card>
                <Header
                    mode={mode}
                    setPageMode={setPageMode} />
                <Main
                    mode={mode} />
                <Footer />
            </Card>
        </Container>
    );
}

export default MainContainer;