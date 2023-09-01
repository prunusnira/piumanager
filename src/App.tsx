import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/main/mainContainer";
import { observer } from "mobx-react";

const App = observer(() => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/saved/:savedId" element={<Main />} />
            </Routes>
        </div>
    );
});

export default App;
