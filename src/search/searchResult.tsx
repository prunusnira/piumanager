import React from "react";
import { Col, Row, Table } from "reactstrap";
import CommonData from "../table/data/commonData";
import SearchItemData from "./searchItems/searchItemData";
import SearchResultPattern from "./searchResultItems/searchResultPattern";
import SearchResultTitle from "./searchResultItems/searchResultTitle";
import TxtSearch from "./txtSearch";

interface Props {
    lang: string,
    list: Array<SearchItemData>
}

const SearchResult = (props: Props) => {
    if(props.list.length === 0) {
        return (
            <Table style={{
                backgroundColor: 'black',
                marginBottom: '0'
            }}>
                <tr>
                    <td
                        style={{
                            height: '50px',
                            textAlign: 'center',
                            color: 'white'
                        }}>
                        {(TxtSearch as any).listEmpty[props.lang]}
                    </td>
                </tr>
            </Table>
        )
    }
    else {
        const rtn = props.list.map(d => (
            <tr style={{
                backgroundColor: 'black',
                padding: '10px'
            }}>
                <td style={{width: '100px'}}>
                    <img alt="jacket" src={CommonData.imgUrl+d.musicid+".png"}
                        onError={(e) => {e.currentTarget.src = process.env.PUBLIC_URL+"/img/empty.jpg"}}
                        style={{
                            width: '100%',
                            minWidth: '75px',
                            maxWidth: '100px'
                        }} />
                </td>
                <td>
                    {(function() {
                        if(props.lang === 'ko') {
                            return <SearchResultTitle title={d.title_ko}></SearchResultTitle>
                        }
                        else {
                            return <SearchResultTitle title={d.title_en}></SearchResultTitle>
                        }
                    })()}
                    <Row>
                        <Col>
                        {
                            d.patterns.map(d => {
                                return <SearchResultPattern pt={d}></SearchResultPattern>
                            })
                        }
                        </Col>
                    </Row>
                </td>
            </tr>
        ));
        return (
            <Table
                style={{
                    marginBottom: '0'
                }}>
                {rtn}
            </Table>
        );
    }
}

export default SearchResult;