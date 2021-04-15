import React from 'react';
import { Card, Container } from 'reactstrap';
import Footer from '../footer/footer';
import Header from '../header/header';
import TableContainer from '../table/tableContainer';

const Main: React.FC<{ lang: string }> = ({ lang }) => {
    return (
        <Container fluid>
            <Card>
                <Header lang={lang} />
                <TableContainer lang={lang} />
                <Footer lang={lang} />
            </Card>
        </Container>
    );
}

export default Main;