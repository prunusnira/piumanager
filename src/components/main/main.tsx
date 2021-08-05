import React  from 'react'
import Search from '../search/search'
import TableContainer from '../table/tableContainer'

interface Props {
    mode: number
}

const Main = (props: Props) => {
    switch(props.mode) {
        case 0:
            return (
                <TableContainer />
            )
        case 1:
            return (
                <Search />
            )
        default:
            return null
    }
}

export default Main