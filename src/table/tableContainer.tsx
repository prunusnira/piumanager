import React, { useState } from "react";
import { CardBody } from "reactstrap";
import PIUTable from "../piutable/piutable";
//import FileLoader from "./fileloader/fileloader";

const TableContainer: React.FC<{lang: string}> = ({lang}) => {
    const [userName, setUserName] = useState('');
    const [userLv, setUserLv] = useState(0);

    return (
        <CardBody>
            {/*<FileLoader lang={lang} />*/}
            <PIUTable />
        </CardBody>
    );
}

export default TableContainer;