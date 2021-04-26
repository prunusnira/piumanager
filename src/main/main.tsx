import React  from 'react';
import SearchPage from '../search/searchPage';
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
                <SearchPage lang={props.lang} />
            );
        default:
            return null;
    }
}

export default Main;