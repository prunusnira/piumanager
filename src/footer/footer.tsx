import React from 'react';
import {
    Row,
    Col,
    CardFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TxtFooter from './txtFooter';

const Footer: React.FC<{lang:string}> = ({lang}) => {
    const langChange = (type: string): void => {
        document.cookie = "lang="+type+"; path=/";
        window.location.reload();
    }

    const Wrapper = styled.div`
        padding: 50px !important;
        height: 50px !important;
        font-size: 80% !important;
        background-color: black !important;
    `;
    
    const astyle = {
        color: "#dddddd",
        textDecoration: "none"
    }

    return (
        <Wrapper>
            <CardFooter>
                <Row>
                    <Col xs="12">
                    Language Select: (Unsaved data will be lost)<br/>
                    <Link to="#no_div" className="link-style1" onClick={() => langChange('ko')}>한국어</Link>&nbsp;
                    <Link to="#no_div" className="link-style1" onClick={() => langChange('jp')}>日本語</Link>&nbsp;
                    <Link to="#no_div" className="link-style1" onClick={() => langChange('cn')}>中文简体</Link>&nbsp;
                    <Link to="#no_div" className="link-style1" onClick={() => langChange('en')}>English</Link>
                    <br/>
                    <span style={{fontSize:"80%"}}>Simplified chinese translation by ZM-J</span>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="12">
                        Caution:<br/>
                        <span>{(TxtFooter as any).iosalert[lang]}</span>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="12">
                        PIUManager (c) 2018 PrunusNira (
                        <a style={astyle} href="https://twitter.com/prunusnira"
                            target="_blink" rel="noopener noreferrer">
                            @prunusNira
                        </a>) /
                        Source Code:&nbsp;
                        <a style={astyle} href="https://github.com/prunusnira/piumanager"
                            target="_blank" rel="noopener noreferrer">GitHub</a><br/>
                        Recent System Update: Feb. 17, 2021<br/>
                        {(TxtFooter as any).fanpage[lang]}<br/><br/>
                        Developed with React & DynamoDB, Hosted on AWS S3
                    </Col>
                </Row>
            </CardFooter>
        </Wrapper>
    );
}

export default Footer;