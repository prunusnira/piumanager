import React from 'react';
import {Route} from 'react-router-dom';
import MainContainer from './main/mainContainer';

function App() {
  return (
    <div className="App">
      <Route path="/saved/:savedId" component={MainContainer} />
      <Route exact path="/" component={MainContainer} />
    </div>
  );
}

export default App;
