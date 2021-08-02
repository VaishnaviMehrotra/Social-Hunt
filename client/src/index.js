import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <SnackbarProvider
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    maxSnack={4}
  >
    <App />
  </SnackbarProvider>,

  document.getElementById('root')
);


