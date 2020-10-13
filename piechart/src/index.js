import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
import history from "./history";

ReactDOM.render(
  <Router history={history}>
    <SnackbarProvider maxSnack={2} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <App />
    </SnackbarProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
