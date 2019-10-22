import React from 'react';
import PIUTable from './piutable/piutable';
import PIUFooter from './piutable/piufooter';
import {Route} from 'react-router-dom';
import SavedTable from './piutable/savedtable';

function App() {
  return (
    <div className="App">
      <Route path="/saved/:name/:type/:lv/:date" component={SavedTable} />
      <Route exact path="/" component={PIUTable} />
      <PIUFooter />
    </div>
  );
}

export default App;
