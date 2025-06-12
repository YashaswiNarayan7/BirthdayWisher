import React from 'react';
import './App.css';
import Birthday from './Birthday';
import RouterBirthday from './RouterBirthday';
import Generate from './Generate';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Birthday} />
          <Route
            exact
            path='/birthday/:name?/:day?/:month?'
            component={RouterBirthday}
          />
          <Route exact path='/generate' component={Generate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

