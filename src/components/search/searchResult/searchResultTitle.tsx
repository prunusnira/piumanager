import React from "react"
import { Col, Row } from "reactstrap"

const SearchResultTitle:React.FC<{title: string}> = (title) => {
    return (
        <Row>
            <Col style={{fontSize: '150%'}}>
                {title.title}
            </Col>
        </Row>
    )
}

export default SearchResultTitle