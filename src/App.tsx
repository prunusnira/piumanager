import React from 'react';
import {Route} from 'react-router-dom';
import SavedTable from './piutable/savedtable';
import MainContainer from './main/mainContainer';

function App() {
  return (
    <div className="App">
      <Route path="/saved/:name/:type/:lv/:date" component={SavedTable} />
      <Route exact path="/" component={MainContainer} />
    </div>
  );
}

export default App;
