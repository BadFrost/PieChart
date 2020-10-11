import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Main } from './components/Main';
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => (
        <Main />
      )} />
    </Switch>
  )
}

export default App;
