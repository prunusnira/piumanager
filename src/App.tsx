import React from "react";
import { Route } from "react-router-dom";
import Main from "./components/main/mainContainer";
import { observer } from "mobx-react";

const App = observer(() => {
    return (
        <div className="App">
            <Route path="/saved/:savedId" component={Main} />
            <Route exact path="/" component={Main} />
        </div>
    );
});

export default App;
