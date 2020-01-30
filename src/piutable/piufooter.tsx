import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';

const astyle = {
    color: "#dddddd",
    textDecoration: "none"
}

class PIUFooter extends Component {
    render() {
        return (
            <footer style={{padding: "50px",
                            height: "50px",
                            fontSize: "80%"}}>
                <Row>
                    <Col xs="12">
                        PIUManager (c) 2018 PrunusNira / Twitter: <a style={astyle} href="https://twitter.com/prunusnira" target="_blink">@prunusNira</a><br/>
                        Source Code:&nbsp;
                        <a style={astyle} href="https://github.com/prunusnira/piumanager"
                            target="_blank">GitHub</a><br/>
                        Recent System Update: Jan. 29, 2020
                    </Col>
                </Row>
            </footer>
        )
    }
}

export default PIUFooter;