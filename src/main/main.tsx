import React  from 'react';
import SearchContainer from '../search/searchContainer';
import TableContainer from '../table/tableContainer';

interface Props {
    lang: string,
    mode: number
}

const Main = (props: Props) => {
    switch(props.mode) {
        case 0:
            return (
                <TableContainer lang={props.lang} />
            );
        case 1:
            return (
                <SearchContainer lang={props.lang} />
            );
        default:
            return null;
    }
}

export default Main;