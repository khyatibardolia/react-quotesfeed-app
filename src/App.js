import React from 'react';
import './App.css';
import Routing from './components/routing';
import {Route, BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <React.Fragment>
            <Router>
                <Route component={Routing}/>
            </Router>
        </React.Fragment>
    </div>
  );
}

export default App;
