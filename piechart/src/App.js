import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Main } from './components/Main';
import { Add } from './components/Add';
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" render={() => (
        <Main />
      )} />
      <Route path="/add" render={() => (
        <Add />
      )} />
    </Switch>
  )
}

export default App;
