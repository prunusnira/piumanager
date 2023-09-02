import React from "react";
import { Route, Routes } from "react-router-dom";
import PageMain from "./page/main/pageMain";
import { observer } from "mobx-react";

const App = observer(() => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<PageMain />} />
                <Route path="/saved/:savedId" element={<PageMain />} />
            </Routes>
        </div>
    );
});

export default App;
