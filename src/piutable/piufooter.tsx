import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import txtPIU from './txtpiu';
import Language from './language';

const astyle = {
    color: "#dddddd",
    textDecoration: "none"
}

class PIUFooter extends Component {
    private langObj = new Language();
    private lang = this.langObj.getLang();
    
    langChange(type: string): void {
        document.cookie = "lang="+type+"; path=/";
        window.location.reload();
    }

    render() {
        return (
            <footer style={{padding: "50px",
                            height: "50px",
                            fontSize: "80%"}}>
                <Row>
                    <Col xs="12">
                    Language Select: (Unsaved data will be lost)<br/>
                    <Link to="#no_div" className="link-style1" onClick={() => this.langChange('ko')}>한국어</Link>&nbsp;
                    <Link to="#no_div" className="link-style1" onClick={() => this.langChange('jp')}>日本語</Link>&nbsp;
                    <Link to="#no_div" className="link-style1" onClick={() => this.langChange('cn')}>中文简体</Link>&nbsp;
                    <Link to="#no_div" className="link-style1" onClick={() => this.langChange('en')}>English</Link>
                    <br/>
                    <span style={{fontSize:"80%"}}>Simplified chinese translation by ZM-J</span>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="12">
                        Caution:<br/>
                        <span>{(txtPIU as any).iosalert[this.lang]}</span>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col xs="12">
                        PIUManager (c) 2018 PrunusNira / Twitter: <a style={astyle} href="https://twitter.com/prunusnira" target="_blink">@prunusNira</a><br/>
                        Source Code:&nbsp;
                        <a style={astyle} href="https://github.com/prunusnira/piumanager"
                            target="_blank">GitHub</a><br/>
                        Recent System Update: Sep. 2, 2020
                    </Col>
                </Row>
            </footer>
        )
    }
}

export default PIUFooter;